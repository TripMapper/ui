import css from './style.module.scss';
import { ReactNode } from 'react';

export interface PageProps {
	heading: string;
	children: ReactNode;
}

export default function Page ({ heading, children } : PageProps) {
	return (
		<section className={css.page}>
			<header className={css.heading}><h1>{heading}</h1></header>
			{children}
		</section>
	);
}
