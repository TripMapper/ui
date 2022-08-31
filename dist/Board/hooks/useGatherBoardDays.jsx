import { useMemo } from 'react';
import { DateTime } from 'luxon';
import ordinal from '../../util/ordinal';
export default function useGatherBoardDays(data) {
    return useMemo(() => {
        if (!data)
            return [];
        const { days, startDate } = data.trip;
        const dt = startDate ? DateTime.fromISO(startDate) : null;
        return Array.from({ length: days }, (_, d) => {
            const date = dt ? dt.plus({ days: d }) : null;
            return {
                key: d,
                index: d,
                label: date ? (<>
						{(d === 0 || date.day === 1) && (<small>{date.toLocaleString({ month: 'long' })}</small>)}
						<strong>
							{ordinal(date.toLocaleString({
                        weekday: 'long',
                        day: 'numeric',
                    }))}
						</strong>
					</>) : (<strong>Day {d + 1}</strong>),
            };
        });
    }, [data]);
}
