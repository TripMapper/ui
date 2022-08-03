export default function empty (val: any): boolean {
	return val === void 0
		|| val === null
		|| (Array.isArray(val) && val.length === 0);
}
