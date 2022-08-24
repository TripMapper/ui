export default function getCurrencySymbol (iso : string) : string {
	return (1).toLocaleString(void 0, {
		style: 'currency',
		currency: iso.toLowerCase(),
		currencyDisplay: 'narrowSymbol',
	}).split(/\d/, 1).shift().trim();
}
