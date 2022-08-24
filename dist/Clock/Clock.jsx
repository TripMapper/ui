import { useMemo } from 'react';
import { DateTime } from 'luxon';
import { useClock } from '../hooks';
export default function Clock({ zone, includeFuture = false, children, }) {
    const clock = useClock();
    return useMemo(() => {
        const tz = DateTime.local().setZone(zone);
        const [time, period] = tz.toLocaleString(DateTime.TIME_SIMPLE).split(' ', 2);
        const ret = {
            time,
            period: period ?? '',
            future: +tz.toLocaleString({ date: 'numeric' }) > +(new Date).getDate() ? ' +1' : '',
        };
        if (children && typeof children === 'function')
            return children(ret);
        return `${time} ${ret.period} ${includeFuture ? ret.future : ''}`.trim();
    }, [zone, clock]);
}
