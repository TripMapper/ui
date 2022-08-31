export default function parseNumberLocale (val : string|number, nanFallback = NaN): number {
	if (typeof val === 'number')
		return val;

	const parts = new Intl.NumberFormat(void 0).formatToParts(12345.6);
	const numerals = [...new Intl.NumberFormat(void 0, {useGrouping: false}).format(9876543210)].reverse();
	const index = new Map(numerals.map((d, i) => [d, i]));
	const group = new RegExp(`[${parts.find(d => d.type === "group").value}]`, "g");
	const decimal = new RegExp(`[${parts.find(d => d.type === "decimal").value}]`);
	const numeral = new RegExp(`[${numerals.join("")}]`, "g");
	const get = d => index.get(d);

	return (val = val.trim()
		.replace(group, "")
		.replace(decimal, ".")
		// @ts-ignore
		.replace(numeral, get)) && !isNaN(+val) ? +val : nanFallback;
}
