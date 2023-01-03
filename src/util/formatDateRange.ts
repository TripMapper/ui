import formatDate from './formatDate';

export default function formatDateRange (
	start : Date|string|number,
	end : Date|string|number,
) : string {
	if (!(start instanceof Date)) start = new Date(start);
	if (!(end instanceof Date)) end = new Date(end);

	const yearsMatch = start.getFullYear() === end.getFullYear();
	const monthsMatch = yearsMatch && start.getMonth() === end.getMonth();

	return formatDate(start, void 0, {
		day: 'numeric',
		month: monthsMatch ? void 0 : 'long',
		year: yearsMatch ? void 0 : 'numeric',
	}) + ' - ' + formatDate(end, void 0, {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
}
