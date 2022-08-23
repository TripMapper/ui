import css from './style.module.scss';
import { ReactNode } from 'react';

export interface InfoBlockGroupProps {
	heading: ReactNode;
	children: ReactNode;
}

export default function InfoBlockGroup ({
	heading,
	children,
} : InfoBlockGroupProps) {
	return (
		<div className={css.infoBlockGroup}>
			<header className={css.heading}>{heading}</header>
			<div className={css.blocks}>
				{children}
			</div>
		</div>
	);
}
