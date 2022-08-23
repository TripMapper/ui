import css from './style.module.scss';
import { MouseEventHandler, ReactNode } from 'react';
import { cx } from '../util';
import Button from '../Button';

export interface HeaderActionProps {
	text: string;
	href?: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface HeaderProps {
	/** @default false */
	pullUp?: boolean;
	logo?: ReactNode;
	menu?: ReactNode;
	contextMenu?: ReactNode;
	logoAction?: HeaderActionProps;
	contextAction?: HeaderActionProps;
}

export default function Header ({
	pullUp,
	logo,
	menu,
	contextMenu,
	logoAction,
	contextAction,
} : HeaderProps) {
	return (
		<header className={cx(
			css.header,
			pullUp && css.pullUp,
		)}>
			<div>
				{logo}
				{logoAction && (
					<Button size="tiny" flat onClick={logoAction.onClick} href={logoAction.href}>{logoAction.text}</Button>
				)}
			</div>
			{menu}
			<div>
				{contextAction && (
					<Button size="tiny" flat onClick={contextAction.onClick} href={contextAction.href}>{contextAction.text}</Button>
				)}
				{contextMenu}
			</div>
		</header>
	);
}
