import { ChangeEventHandler, FocusEventHandler, forwardRef, Ref } from 'react';
import parseNumberLocale from '../util/parseNumberLocale';

export interface BaseInputProps {
	/** @default text */
	type?:
		| 'color'
		| 'email'
		| 'number'
		| 'password'
		| 'search'
		| 'tel'
		| 'text'
		| 'url'
		| 'week'
		| 'date'
		| 'time'
		| 'datetime-local'
		| 'numeric';
	autoComplete?: string | undefined;
	autoFocus?: boolean | undefined;
	disabled?: boolean | undefined;
	max?: number | string | undefined;
	maxLength?: number | undefined;
	min?: number | string | undefined;
	minLength?: number | undefined;
	name?: string | undefined;
	pattern?: string | undefined;
	placeholder?: string | undefined;
	readOnly?: boolean | undefined;
	required?: boolean | undefined;
	size?: number | undefined;
	step?: number | string | undefined;
	value?: string | number | undefined;
	inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined;

	defaultValue?: string | number | undefined;

	onFocus?: FocusEventHandler<HTMLInputElement> | undefined;
	onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
	onInput?: ChangeEventHandler<HTMLInputElement> | undefined;
	onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

export interface BaseInputPropsWithClassName extends BaseInputProps {
	className?: string;
	ref?: Ref<HTMLInputElement>;
}

const Base = forwardRef<HTMLInputElement, BaseInputPropsWithClassName>(({
	type = 'text',
	className,
	...props
} : BaseInputPropsWithClassName, ref) => {
	const isNumeric = type === 'numeric';

	if (isNumeric) {
		type = 'text';
		props.inputMode = 'numeric';
		props.pattern = '[,.\\d]*';

		const oldOnChange = props.onChange
		props.onChange = e => {
			e.persist();
			(e as any).numericValue = () => parseNumberLocale(e.target.value, e.target.value as any);
			oldOnChange?.(e);
		};
	}

	return (
		<input
			type={type}
			className={className}
			{...props}
			ref={ref}
		/>
	);
});

export default Base;
