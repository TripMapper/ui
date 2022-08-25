import css from './style.module.scss';
import { cx } from '../util';
export default function Pill({ children, className, muted, travel, activity, accommodation, food, other, plus, }) {
    return (<span className={cx(css.pill, className, muted && css.muted, travel && css.travel, activity && css.activity, accommodation && css.accommodation, food && css.food, other && css.other, plus && css.plus)}>
			{children}
		</span>);
}
