// Converts pixels to rems based on a base font size of 16px
export function pxToRem(px) {
    return px / 16;
}

// Formats a number to four decimal places and removes trailing zeros
export function formatNumber(num) {
    let rounded = num.toFixed(4);
    rounded = rounded.replace(/\.?0+$/, '');
    return rounded;
}

// Calculates the clamp CSS code given font sizes and screen sizes
export function calculateClamp(fontSizeMin, fontSizeMax, screenSizeMin, screenSizeMax) {
    // Convert screen sizes from pixels to rems
    const minVW = pxToRem(screenSizeMin);
    const maxVW = pxToRem(screenSizeMax);

    // Validate input
    if (
        isNaN(fontSizeMin) || isNaN(fontSizeMax) ||
        isNaN(minVW) || isNaN(maxVW) ||
        minVW === maxVW
    ) {
        throw new Error('Invalid input values. Ensure sizes are numbers and min and max screen sizes are not equal.');
    }

    // Calculate the slope and intercept for the clamp function
    const slopeVW = (fontSizeMax - fontSizeMin) / (maxVW - minVW);
    const yIntercept = fontSizeMin - (slopeVW * minVW);

    const slopeVWFormatted = formatNumber(slopeVW * 100);
    const yInterceptFormatted = formatNumber(yIntercept);
    const minFSFormatted = formatNumber(fontSizeMin);
    const maxFSFormatted = formatNumber(fontSizeMax);

    // Return the clamp CSS code
    return {
        clampCode: `font-size: clamp(${minFSFormatted}rem, calc(${yInterceptFormatted}rem + ${slopeVWFormatted}vw), ${maxFSFormatted}rem);`,
        slopeVW,
        yIntercept
    };
}

// Reverses the clamp values to get the minimum and maximum screen widths
export function reverseClamp(fontSizeMin, fontSizeMax, slopeVW, yIntercept) {
    // Calculate min and max viewport widths in rems
    const minVW = (fontSizeMin - yIntercept) / slopeVW;
    const maxVW = (fontSizeMax - yIntercept) / slopeVW;

    // Convert viewport widths back to pixels from rems
    const minScreenWidth = minVW * 16;
    const maxScreenWidth = maxVW * 16;

    return {
        minScreenWidth: formatNumber(minScreenWidth),
        maxScreenWidth: formatNumber(maxScreenWidth)
    };
}
