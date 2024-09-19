function copyToClipboard(codeOutput) {
	const code = codeOutput.textContent;
	navigator.clipboard.writeText(code).then(() => { }, (err) => {
		console.err('Failed to copy code: ' + err);
	});
}

// Initialize ClampGenerator when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
	const fontSizeMinInput = document.getElementById('font-size-min');
	const fontSizeMaxInput = document.getElementById('font-size-max');
	const screenSizeMinInput = document.getElementById('screen-size-min');
	const screenSizeMaxInput = document.getElementById('screen-size-max');
	const output = document.querySelector('.output .code code');
	new ClampGenerator(fontSizeMinInput, fontSizeMaxInput, screenSizeMinInput, screenSizeMaxInput, output);

	const copyButton = document.getElementById('copy-button');
	copyButton.addEventListener('click', () => copyToClipboard(output));
});
