import { UIContextPointer } from '../UIContext';
export default function formatCurrency(value = 0, currency = 'USD', stripZero = false, asParts = false, narrowSymbol = true) {
    if (value === 0 && stripZero)
        return '';
    if (typeof currency === 'object')
        currency = currency?.iso;
    // Safely round to 2 decimal places
    value = Math.round((value + Number.EPSILON) * 100) / 100;
    let formattedValue = value.toLocaleString(UIContextPointer.ref?.preferredLocale, {
        style: 'currency',
        currency: currency.toLowerCase(),
        currencyDisplay: narrowSymbol ? 'narrowSymbol' : 'symbol',
    });
    if (stripZero)
        formattedValue = formattedValue.replace(/\.0+$/, '');
    if (asParts)
        return {
            symbol: formattedValue.split(/\d/, 1).shift(),
            integer: Math.trunc(value),
            mantissa: String(value.toFixed(2)).split('.', 2)[1],
        };
    return formattedValue;
}
