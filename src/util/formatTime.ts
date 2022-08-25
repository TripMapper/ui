import { DateTime } from 'luxon';

export default function formatTime (time) {
	return DateTime.fromISO(time instanceof Date ? time.toISOString() : time).toLocaleString(DateTime.TIME_SIMPLE);
}
