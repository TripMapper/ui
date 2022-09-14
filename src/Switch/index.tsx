import css from './style.module.scss';
import { ChangeEventHandler, forwardRef } from 'react';
import { cx } from '../util';

export interface SwitchProps {
	className?: string;

	name?: string;
	label?: string;
	preLabel?: string;
	/** @default false */
	defaultChecked?: boolean;
	/** @default (bool)1 */
	value?: string | number;
	/** @default (bool)0 */
	valueDefault?: string | number;
	center?: boolean;

	onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

const Switch = forwardRef<HTMLLabelElement, SwitchProps>(({
	className,
	name,
	label,
	preLabel,
	defaultChecked = false,
	onChange,
	value = '(bool)1',
	valueDefault = '(bool)0',
	center = false,
}, ref) => (
	<label ref={ref} className={cx(className, css.switch, center && css.center)}>
		{preLabel && <span className={css.label}>{preLabel}</span>}

		<span className={css.wrap}>
			<input type="hidden" name={name} value={valueDefault} />
			<input
				type="checkbox"
				value={value}
				name={name}
				defaultChecked={defaultChecked}
				onChange={onChange}
				className={css.input}
			/>
			<span className={css.toggle} />
		</span>

		{label && <span className={css.label}>{label}</span>}
	</label>
));

export default Switch;
