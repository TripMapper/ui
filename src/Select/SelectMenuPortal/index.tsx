import css from './style.module.scss';
import { components } from 'react-select';
import { cx } from '../../util';

export default function SelectMenuPortal (props) {
	return (
		<components.MenuPortal
			{...props}
			className={cx(css.menu, props.selectProps.className)}
		>
			{props.children}
		</components.MenuPortal>
	);
}
