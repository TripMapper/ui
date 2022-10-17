import { UIContextPointer } from '../UIContext';
export default function formatCurrency(value = 0, currency = 'USD', stripZero = false, asParts = false, narrowSymbol = true) {
    if (value === 0 && stripZero)
        return '';
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
            mantissa: String(Math.abs(value) % 1).substring(2, 4),
        };
    return formattedValue;
}
