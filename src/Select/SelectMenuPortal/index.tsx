import css from './style.module.scss';
import { components } from 'react-select';

export default function SelectMenuPortal (props) {
	return (
		<components.MenuPortal
			{...props}
			className={css.menu}
		>
			{props.children}
		</components.MenuPortal>
	);
}
