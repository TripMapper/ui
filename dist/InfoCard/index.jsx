import css from './style.module.scss';
import { cx } from '../util';
export default function InfoCard({ highlight = false, className, children, }) {
    return (<div className={cx(css.infoCard, highlight && css.highlight, className)}>
			{children}
		</div>);
}
