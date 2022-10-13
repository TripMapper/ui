import UIContext from '../UIContext';
export default function formatDate(date, format = 'short', options) {
    // @ts-ignore
    const locale = UIContext?.['preferredLocale'] ?? UIContext?._currentValue?.preferredLocale ?? void 0;
    if (!(date instanceof Date))
        date = new Date(date);
    if (isNaN(date))
        return '!!Error: Invalid Date!!';
    if (options)
        return date.toLocaleDateString(locale, options);
    switch (format) {
        case 'long':
            return date.toLocaleDateString(locale, { dateStyle: 'long' });
        case 'short':
        default:
            return date.toLocaleDateString(locale, { dateStyle: 'short' });
    }
}
