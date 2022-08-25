import css from './style.module.scss';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
export default function Outlet({ name, notes, }) {
    const Graphic = useMemo(() => dynamic(() => import(`../svg/socket/${name.toLowerCase()}.svg`), {
        loading: () => null,
    }), [name]);
    return (<figure className={css.outlet}>
			<Graphic />
			<figcaption>
				<h5>{name}</h5>
				<p>{notes}</p>
			</figcaption>
		</figure>);
}
