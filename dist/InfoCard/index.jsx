import css from './style.module.scss';
import { cx } from '../util';
export default function InfoCard({ highlight = false, children, }) {
    return (<div className={cx(css.infoCard, highlight && css.highlight)}>
			{children}
		</div>);
}
