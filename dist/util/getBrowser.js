export default function getBrowser() {
    if (navigator.userAgent.includes('Chrome') || navigator.userAgent.includes('Chromium'))
        return 'chrome';
    if (navigator.userAgent.includes('AppleWebKit'))
        return 'safari';
    return 'firefox';
}
