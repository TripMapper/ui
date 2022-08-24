import css from './style.module.scss';
import { cx } from '../util';

export interface InfoCardProps {
	highlight?: boolean;
}

export default function InfoCard ({
	highlight = false,
} : InfoCardProps) {
	return (
		<div className={cx(css.infoCard, highlight && css.highlight)}>
			hi
		</div>
	);
}
