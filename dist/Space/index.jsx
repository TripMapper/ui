import css from './style.module.scss';
import { cx } from '../util';
export default function Space({ children, column = false, wrap = false, around = false, noMargin = false, }) {
    return (<div className={cx(css.space, column && css.column, wrap && css.wrap, around && css.around, noMargin && css.noMargin)}>
			{children}
		</div>);
}
