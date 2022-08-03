export interface CurrencyParts {
    symbol: string;
    integer: number;
    mantissa: number;
}
export default function formatCurrency(value?: number, currency?: string, stripZero?: boolean, asParts?: boolean): string | CurrencyParts;
