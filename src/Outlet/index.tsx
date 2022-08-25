import css from './style.module.scss';
import Placeholder from '../svg/socket/placeholder.svg';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';

export interface OutletProps {
	name: string;
	notes: string;
}

export default function Outlet ({
	name,
	notes,
} : OutletProps) {
	const Graphic = useMemo(
		() => dynamic(() => import(`../svg/socket/${name.toLowerCase()}.svg`), {
			loading: () => <Placeholder />,
		}),
		[name]
	);

	return (
		<figure className={css.outlet}>
			<Graphic />
			<figcaption>
				<h5>{name}</h5>
				<p>{notes}</p>
			</figcaption>
		</figure>
	);
}
