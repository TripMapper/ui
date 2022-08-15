import css from './style.module.scss';
import { cx } from '../util';
export default function Header({ pullUp, children }) {
    return (<header className={cx(css.header, pullUp && css.pullUp)}>
			{children}
		</header>);
}
