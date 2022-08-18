import css from './style.module.scss';
import { ReactNode } from 'react';
import Flag from '../Flag';
import { Flags } from '../Types';

export interface OverviewLayoutProps {
	flagIso?: readonly Flags[];
	name?: string;
	content?: ReactNode;
	info?: ReactNode;
}

const overviewWide = css.wide;

export { overviewWide };

export default function OverviewLayout ({
	flagIso,
	name,
	content,
	info,
} : OverviewLayoutProps) {
	return (
		<section className={css.overview}>
			<div>
				<div className={css.flags}>
					{flagIso?.map(iso => <Flag key={iso} iso={iso} large />)}
				</div>
				<h1 className={css.name}>{name}</h1>
				{content}
			</div>
			<dl className={css.info}>
				{info}
			</dl>
		</section>
	);
}
