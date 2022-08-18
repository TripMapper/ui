import css from './style.module.scss';
import button from '../../Button';
import { MouseEventHandler } from 'react';
import cx from '../../util/cx';
import { Icons } from '../../Types';
import Icon from '../../Icon';

export interface ContextItemButtonProps {
	type?: undefined | "danger";
	text: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
	icon?: Icons;
}

export default function ContextItemButton ({ type, text, onClick, icon } : ContextItemButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cx(
				css.btn,
				type === 'danger' && css.danger,
			)}
		>
			{icon && <Icon of={icon} l />}
			{text}
		</button>
	);
}
