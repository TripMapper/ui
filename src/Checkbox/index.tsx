import css from './style.module.scss';
import { ReactNode, Ref } from 'react';

export interface CheckboxProps {
	name: string;
	/** @default "(bool)1" */
	value?: string;
	/** @default false */
	includeFalsyValue?: boolean;
	/** @default "(bool)0" */
	falsyValue?: string;
	/** @default false */
	required?: boolean;
	/** @default false */
	defaultChecked?: boolean;
	label?: string | ReactNode;
	inputRef?: Ref<HTMLInputElement> | undefined;
}

export default function Checkbox ({
	name,
	value = '(bool)1',
	includeFalsyValue = false,
	falsyValue = '(bool)0',
	required = false,
	defaultChecked = false,
	label,
	inputRef = null,
} : CheckboxProps) {
	return (
		<label className={css.label}>
			{includeFalsyValue && (
				<input
					type="hidden"
					name={name}
					defaultValue={falsyValue}
				/>
			)}
			<input
				ref={inputRef}
				type="checkbox"
				name={name}
				value={value}
				defaultChecked={defaultChecked}
				required={required}
			/>
			<span className={css.checkbox} />
			{label && (
				<span className={css.label}>{label}</span>
			)}
		</label>
	);
}
