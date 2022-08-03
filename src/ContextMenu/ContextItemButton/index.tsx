import css from './style.module.scss';
import button from '../../Button';
import { MouseEventHandler } from 'react';
import cx from '../../util/cx';

export interface ContextItemButtonProps {
	type?: undefined | "danger";
	text: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function ContextItemButton ({ type, text, onClick } : ContextItemButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cx(
				css.btn,
				type === 'danger' && css.danger,
			)}
		>
			{text}
		</button>
	);
}
