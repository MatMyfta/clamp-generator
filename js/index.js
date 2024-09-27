import { pxToRem, formatNumber, calculateClamp, reverseClamp } from './clampCalculator.js';

// // Initialize ClampGenerator when the DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
// 	const fontSizeMinInput = document.getElementById('font-size-min');
// 	const fontSizeMaxInput = document.getElementById('font-size-max');
// 	const screenSizeMinInput = document.getElementById('screen-size-min');
// 	const screenSizeMaxInput = document.getElementById('screen-size-max');
// 	const output = document.querySelector('.output .code code');
// 	new ClampGenerator(fontSizeMinInput, fontSizeMaxInput, screenSizeMinInput, screenSizeMaxInput, output);

// });

document.addEventListener('DOMContentLoaded', () => {
	// Get input elements
	const fontSizeMinInput = document.getElementById('font-size-min');
	const fontSizeMaxInput = document.getElementById('font-size-max');
	const screenSizeMinInput = document.getElementById('screen-size-min');
	const screenSizeMaxInput = document.getElementById('screen-size-max');
	const clampCalculatorOutput = document.getElementById('calculate-clamp-output');
	const slopeInput = document.getElementById('slope-input');
	const yInterceptInput = document.getElementById('y-intercept-input');
	const reverseClampMinSizeOutput = document.getElementById('reverse-min-size-output');
	const reverseClampMaxSizeOutput = document.getElementById('reverse-max-size-output');
	const reverseOutput = document.getElementById('reverse-output');

	function copyToClipboard(codeOutput) {
		const code = codeOutput.textContent;
		navigator.clipboard.writeText(code).then(() => { }, (err) => {
			console.err('Failed to copy code: ' + err);
		});
	}

	// Function to update the clamp code based on input values
	function updateClampCode() {
		try {
			// Get values from inputs
			const fontSizeMin = parseFloat(fontSizeMinInput.value);
			const fontSizeMax = parseFloat(fontSizeMaxInput.value);
			const screenSizeMin = parseFloat(screenSizeMinInput.value);
			const screenSizeMax = parseFloat(screenSizeMaxInput.value);

			// Calculate clamp code
			const { clampCode, slopeVW, yIntercept } = calculateClamp(fontSizeMin, fontSizeMax, screenSizeMin, screenSizeMax);

			// Display the clamp code
			clampCalculatorOutput.textContent = clampCode;

			// Store slope and intercept for reversal
			clampCalculatorOutput.dataset.slopeVW = slopeVW;
			clampCalculatorOutput.dataset.yIntercept = yIntercept;
		} catch (error) {
			clampCalculatorOutput.textContent = error.message;
		}
	}

	// Function to reverse the clamp calculation
	function reverseClampCalculation() {
		try {
			// Get stored slope and intercept
			const slopeVW = parseFloat(clampCalculatorOutput.dataset.slopeVW);
			const yIntercept = parseFloat(clampCalculatorOutput.dataset.yIntercept);

			// Get font sizes
			const fontSizeMin = parseFloat(fontSizeMinInput.value);
			const fontSizeMax = parseFloat(fontSizeMaxInput.value);

			// Reverse the clamp calculation
			const { minScreenWidth, maxScreenWidth } = reverseClamp(fontSizeMin, fontSizeMax, slopeVW, yIntercept);

			// Display the reversed screen sizes
			reverseClampMinSizeOutput.textContent = minScreenWidth;
			reverseClampMaxSizeOutput.textContent = maxScreenWidth;
		} catch (error) {
			reverseOutput.textContent = error.message;
		}
	}

	// Add event listeners to inputs
	fontSizeMinInput.addEventListener('input', updateClampCode);
	fontSizeMaxInput.addEventListener('input', updateClampCode);
	screenSizeMinInput.addEventListener('input', updateClampCode);
	screenSizeMaxInput.addEventListener('input', updateClampCode);

	// Add event listener to reverse button
	slopeInput.addEventListener('input', reverseClampCalculation);
	yInterceptInput.addEventListener('input', reverseClampCalculation);

	const copyButton = document.getElementById('copy-button');
	copyButton.addEventListener('click', () => copyToClipboard(clampCalculatorOutput));


	// Initial calculation
	updateClampCode();
	reverseClampCalculation();
});
