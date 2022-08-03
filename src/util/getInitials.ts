const RX = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

export default function getInitials (name: string) : string {
	const initials = [...name.matchAll(RX)] || [];

	return (
		(initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
	).toUpperCase();
}
