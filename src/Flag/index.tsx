import css from './style.module.scss';
import { cx } from '../util';
import { ReactNode, useEffect, useState } from 'react';

export interface FlagProps {
	iso: string;
	small?: boolean;
	medium?: boolean;
	large?: boolean;
}

export default function Flag ({
	iso,
	small = false,
	medium = false,
	large = false,
} : FlagProps) : ReactNode {
	const [svgPath, setSvgPath] = useState('');
	useEffect(() => {
		(async () => {
			const path = (await import('../svg/flags.svg')).default;
			console.log(path);
			setSvgPath(path);
		})();
	}, []);

	iso = iso.toUpperCase();

	const className = cx(
		css.flag,
		small && css.s,
		medium && css.m,
		large && css.l,
		(iso === 'NP') && css.uniqueShape,
	);

	return <svg viewBox="0 0 32 24" className={className}><use xlinkHref={`${svgPath}#${iso}`}/></svg>;
}
