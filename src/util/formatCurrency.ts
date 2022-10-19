import { UIContextPointer } from '../UIContext';

export interface CurrencyParts {
	symbol: string;
	integer: number;
	mantissa: number;
}

export default function formatCurrency (
	value : number = 0,
	currency : string = 'USD',
	stripZero : boolean = false,
	asParts : boolean = false,
	narrowSymbol : boolean = true,
) : string | CurrencyParts {
	if (value === 0 && stripZero)
		return '';

	// Safely round to 2 decimal places
	value = Math.round((value + Number.EPSILON) * 100) / 100;

	let formattedValue = value.toLocaleString(UIContextPointer.ref?.preferredLocale, {
		style: 'currency',
		currency: currency.toLowerCase(),
		currencyDisplay: narrowSymbol ? 'narrowSymbol' : 'symbol',
	});

	if (stripZero)
		formattedValue = formattedValue.replace(/\.0+$/, '');

	if (asParts) return {
		symbol: formattedValue.split(/\d/, 1).shift(),
		integer: Math.trunc(value),
		mantissa: +String(value).split('.', 2)[1],
	};

	return formattedValue;
}
