import css from './style.module.scss';
import { cx } from '../util';
export default function InfoCard({ highlight = false, }) {
    return (<div className={cx(css.infoCard, highlight && css.highlight)}>
			hi
		</div>);
}
