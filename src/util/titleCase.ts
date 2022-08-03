export default function titleCase (str : string) : string {
	return str
		.toLowerCase()
		.replace (/^[-_]*(.)/, (_, c) => c.toUpperCase())
		.replace (/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase());
}
