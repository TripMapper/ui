import css from './style.module.scss';
import { cx } from '../util';
import Icon from '../Icon';
export default function Notice({ children, error = false, success = false, warning = false, icon = null, className, }) {
    return (<div className={cx(css.notice, className, error && css.error, success && css.success, warning && css.warning, icon && css.icon)}>
			{icon ? (<>
					<Icon of={icon} m/>
					<div>{children}</div>
				</>) : children}
		</div>);
}
