import css from './style.module.scss';
import InfoCard from '../InfoCard';
import { cx } from '../util';
import { DateTime } from 'luxon';
import Clock from '../Clock';
import Day from '../svg/day.svg';
import Night from '../svg/night.svg';

export interface TimezoneCardProps {
	zone?: string;
	highlight?: boolean;
}

export default function TimezoneCard ({
	zone,
	highlight = false,
} : TimezoneCardProps) {
	const tz = DateTime.local().setZone(zone);
	const offset = (tz.offset > 0 ? '+' : '') + (tz.offset / 60);
	const day = tz.hour > 6 && tz.hour < 18;

	return (
		<InfoCard
			highlight={highlight}
			className={cx(
				css.timezone,
				!zone && css.current,
			)}
		>
			<header className={css.header}>
				<strong>{zone?.replace(/_/g, ' ') ?? 'Current Time'}</strong>
				UTC {offset}
			</header>
			<div className={css.time}>
				{day ? <Day /> : <Night />}
				<Clock zone={zone}>
					{({ time, period }) => (
						<>
							<span>{time}</span>
							{period && <small>{period}</small>}
						</>
					)}
				</Clock>
			</div>
		</InfoCard>
	);
}
