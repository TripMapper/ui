import { DateTime } from 'luxon';
export default function diffTime(start, end) {
    const s = DateTime.fromISO(start instanceof Date ? start.toISOString() : start), e = DateTime.fromISO(end instanceof Date ? end.toISOString() : end);
    const { minutes, hours } = e.diff(s, ['minutes', 'hours']).toObject();
    return [
        hours > 0 ? `${hours.toFixed(0)}h` : null,
        minutes > 0 ? `${minutes.toFixed(0)}m` : null,
    ].filter(Boolean).join(' ');
}
