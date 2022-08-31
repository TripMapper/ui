import css from './style.module.scss';
import { cx } from '../util';
export default function Notice({ children, error = false, success = false, warning = false, className, }) {
    return (<div className={cx(css.notice, className, error && css.error, success && css.success, warning && css.warning)}>
			{children}
		</div>);
}
