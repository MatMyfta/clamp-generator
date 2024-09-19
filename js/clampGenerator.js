class ClampGenerator {
    constructor(fontSizeMinInput, fontSizeMaxInput, screenSizeMinInput, screenSizeMaxInput, output) {
        // Get input elements
        this.fontSizeMinInput = fontSizeMinInput;
        this.fontSizeMaxInput = fontSizeMaxInput;
        this.screenSizeMinInput = screenSizeMinInput;
        this.screenSizeMaxInput = screenSizeMaxInput;
        this.codeOutput = output;

        // Bind event listeners
        this.fontSizeMinInput.addEventListener('input', () => this.update());
        this.fontSizeMaxInput.addEventListener('input', () => this.update());
        this.screenSizeMinInput.addEventListener('input', () => this.update());
        this.screenSizeMaxInput.addEventListener('input', () => this.update());

        // Initial update
        this.update();
    }

    pxToRem(px) {
        return px / 16;
    }

    formatNumber(num) {
        // Round to 4 decimal places and remove trailing zeros
        let rounded = num.toFixed(4);
        rounded = rounded.replace(/\.?0+$/, '');
        return rounded;
    }

    update() {
        // Get values
        const minFS = parseFloat(this.fontSizeMinInput.value);
        const maxFS = parseFloat(this.fontSizeMaxInput.value);
        const minVW = parseFloat(this.pxToRem(this.screenSizeMinInput.value));
        const maxVW = parseFloat(this.pxToRem(this.screenSizeMaxInput.value));

        // Validate input
        if (
            isNaN(minFS) || isNaN(maxFS) ||
            isNaN(minVW) || isNaN(maxVW) ||
            minVW === maxVW
        ) {
            this.codeOutput.textContent = 'Please enter valid input values.';
            return;
        }

        // Calculate slope (slope_vw) and intercept (y_intercept)
        const slope_vw = (maxFS - minFS) / (maxVW - minVW);
        const y_intercept = minFS - (slope_vw * minVW);

        const slope_vw_formatted = this.formatNumber(slope_vw * 100);
        const y_intercept_formatted = this.formatNumber(y_intercept);
        const minFS_formatted = this.formatNumber(minFS);
        const maxFS_formatted = this.formatNumber(maxFS);

        // Generate clamp code
        const clampCode = `font-size: clamp(${minFS_formatted}rem, calc(${y_intercept_formatted}rem + ${slope_vw_formatted}vw), ${maxFS_formatted}rem);`;

        // Output code
        this.codeOutput.textContent = clampCode;
    }
}