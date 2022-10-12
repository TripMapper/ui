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
) : string | CurrencyParts {
	if (value === 0 && stripZero)
		return '';

	let formattedValue = value.toLocaleString(void 0, {
		style: 'currency',
		currency: currency.toLowerCase(),
		currencyDisplay: 'narrowSymbol',
	});

	if (stripZero)
		formattedValue = formattedValue.replace(/\.0+$/, '');

	if (asParts) return {
		symbol: formattedValue.split(/\d/, 1).shift(),
		integer: value|0,
		mantissa: String(Math.abs(value) % 1).substring(2, 4) as unknown as number|0,
	};

	return formattedValue;
}
