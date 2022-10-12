import css from './style.module.scss';
import { cx } from '../util';
export default function Pill({ children, className, muted, large = false, travel, activity, accommodation, food, other, plus, type, }) {
    return (<span className={cx(css.pill, className, muted && css.muted, large && css.large, (travel || type === 'travel') && css.travel, (activity || type === 'activity') && css.activity, (accommodation || type === 'accommodation') && css.accommodation, (food || type === 'food') && css.food, (other || type === 'other') && css.other, plus && css.plus)}>
			{children}
		</span>);
}
