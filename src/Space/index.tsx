import css from './style.module.scss';
import { cx } from '../util';

export default function Space ({
	children,
	column = false,
	wrap = false,
	around = false,
}) {
	return (
		<div className={cx(
			css.space,
			column && css.column,
			wrap && css.wrap,
			around && css.around,
		)}>
			{children}
		</div>
	);
}
