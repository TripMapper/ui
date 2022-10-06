import * as process from 'process';

export default function getBrowser () {
	// @ts-ignore
	if (!process.browser || !window.navigator)
		return '';

	if (navigator.userAgent.includes('Chrome') || navigator.userAgent.includes('Chromium'))
		return 'chrome';

	if (navigator.userAgent.includes('AppleWebKit'))
		return 'safari';

	return 'firefox';
}
