export interface CurrencyParts {
    symbol: string;
    integer: number;
    mantissa: string;
}
export default function formatCurrency(value?: number, currency?: string, stripZero?: boolean, asParts?: boolean, narrowSymbol?: boolean): string | CurrencyParts;
