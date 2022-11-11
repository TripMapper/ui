import css from './style.module.scss';
import { ChangeEventHandler } from 'react';

export interface RadioProps {
	name: string;
	label?: string;
	prefix?: string;
	suffix?: string;
	value?: string;
	defaultChecked?: boolean;
	onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function Radio ({
	name,
	label = '',
	prefix = '',
	suffix = '',
	value = '1',
	defaultChecked = false,
	onChange,
} : RadioProps) {
	return (
		<label className={css.radio}>
			<input
				type="radio"
				name={name}
				value={value}
				defaultChecked={defaultChecked}
				onChange={onChange}
			/>
			{prefix && <span className={css.prefix}>{prefix}</span>}
			<span className={css.input} />
			{suffix && <span className={css.suffix}>{suffix}</span>}
			{label && <span className={css.label}>{label}</span>}
		</label>
	);
}
