import css from './style.module.scss';
import { DateTime } from 'luxon';
import { useEffect, useMemo, useState } from 'react';

export interface CountdownProps {
	target: Date;
}

const UNITS = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];

function until (target : DateTime) {
	if (target < DateTime.now())
		return [
			['00', 'hours'],
			['00', 'minutes'],
			['00', 'seconds'],
		];

	const diff = target.diffNow(UNITS).toObject();

	let keysToUse = [];

	for (const [key, unit] of Object.entries(UNITS))
	{
		if (unit === 'hours') {
			keysToUse = UNITS.slice(+key);
			break;
		} else if (diff[unit] > 0) {
			keysToUse = UNITS.slice(+key, +key + 3);
			break;
		}
	}

	return keysToUse.map(unit => [
		diff[unit]?.toFixed(0)?.padStart(2, '0') ?? '00',
		unit.replace(diff[unit] === 1 ? /s$/ : void 0, ''),
	]);
}

export default function Countdown ({ target } : CountdownProps) {
	const t = useMemo(() => {
		return target instanceof Date
			? DateTime.fromJSDate(target)
			: DateTime.fromSQL(target)
	}, [target]);
	const [v, setV] = useState(until(t));

	useEffect(() => {
		if (!t) return;

		setV(until(t));

		if (t < DateTime.now()) return;

		const iv = setInterval(() => {
			setV(until(t));
		}, 1000);

		return () => {
			clearInterval(iv);
		};
	}, [t]);

	return (
		<div className={css.countdown}>
			{v.map(([value, unit]) => (
				<figure key={value + unit}>
					<strong>{value}</strong>
					<figcaption>{unit}</figcaption>
				</figure>
			))}
		</div>
	);
}
