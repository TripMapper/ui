import css from './style.module.scss';
import { ChangeEventHandler, forwardRef } from 'react';
import { cx } from '../util';

export interface SwitchProps {
	className?: string;

	name?: string;
	label?: string;
	/** @default false */
	defaultChecked?: boolean;
	/** @default (bool)1 */
	value?: string | number;

	onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

const Switch = forwardRef<HTMLLabelElement, SwitchProps>(({
	className,
	name,
	label,
	defaultChecked = false,
	onChange,
	value = '(bool)1',
}, ref) => (
	<label ref={ref} className={cx(className, css.switch)}>
		<input
			type="checkbox"
			value={value}
			name={name}
			defaultChecked={defaultChecked}
			onChange={onChange}
			className={css.input}
		/>
		<span className={css.toggle} />

		{label && <span className={css.label}>{label}</span>}
	</label>
));

export default Switch;
