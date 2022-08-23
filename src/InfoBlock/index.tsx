import css from './style.module.scss';
import Icon from '../Icon';
import { Icons } from '../Types';
import { ReactNode, useState } from 'react';
import Slideover from '../Slideover';

export interface InfoBlockProps {
	icon: Icons;
	primary: string;
	secondary?: string;
	count?: string;
	label: string;
	children?: ReactNode;
}

export default function InfoBlock ({
	icon,
	primary,
	secondary,
	count,
	label,
	children,
} : InfoBlockProps) {
	const [open, setOpen] = useState(false);
	const onClick = () => setOpen(true)
		, onRequestClose = () => setOpen(false);

	return (
		<>
			<button type="button" className={css.infoBlock} onClick={onClick}>
				<div>
					{count && <span className={css.count}>{count}</span>}
					<Icon of={icon} xl />
					<span className={css.primary} title={primary}>{primary}</span>
					<small className={css.secondary} title={secondary}>{secondary}</small>
				</div>
				<small className={css.label}>{label}</small>
			</button>
			{children && (
				<Slideover isOpen={open} onRequestClose={onRequestClose} heading={label}>
					{children}
				</Slideover>
			)}
		</>
	);
}
