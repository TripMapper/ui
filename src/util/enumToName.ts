export default function enumToName(e : string) : string {
	if (e.length < 3) return e;

	return e
		.toLowerCase()
		.replace(/_/g, ' ')
		.replace(/(^| )(\w)/g, (m) => {
			return String.prototype.toUpperCase.call(m);
		});
}
