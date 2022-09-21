import UIContext from '../UIContext';

export type DateFormat = 'short' | 'long';

export default function formatDate (
	date : Date|string|number,
	format : DateFormat = 'short'
): string {
	// @ts-ignore
	const locale = UIContext?.['preferredLocale'] ?? UIContext?._currentValue?.preferredLocale ?? void 0;

	if (!(date instanceof Date))
		date = new Date(date);

	if (isNaN(date as unknown as number))
		return '!!Error: Invalid Date!!';

	switch (format) {
		case 'long':
			return date.toLocaleDateString(locale, { dateStyle: 'long' });
		case 'short':
		default:
			return date.toLocaleDateString(locale, { dateStyle: 'short' });
	}
}
