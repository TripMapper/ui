import css from './style.module.scss';
import { cx } from '../util';
export default function Tag({ children, margin = true, look = null, small = false, }) {
    return (<div className={cx(css.tag, margin && css.margin, look && css[look], small && css.small)}>
			{children}
		</div>);
}
