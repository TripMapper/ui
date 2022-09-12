import css from './style.module.scss';
import Generic, { GenericInputProps } from '../Generic';
import { forwardRef, useRef, useState } from 'react';
import cx from '../../util/cx';

const VALID_COLOUR_RX = /^#([0-9A-F]{3}){1,2}$/i;

export interface ColorInputProps extends Omit<GenericInputProps, "prefix" | "type"> {}

const Color = forwardRef<HTMLInputElement, ColorInputProps>(({ onChange, defaultValue, name, ...props } : ColorInputProps, ref) => {
	const self = useRef();

	const [v, setV] = useState(defaultValue as string ?? '')
		, [valid, _setValid] = useState(true);

	const setValid = v => {
		_setValid(v);
		(self.current as HTMLInputElement).setCustomValidity(v ? '' : 'Invalid colour');
	};

	const _onColourChange = e => {
		e.persist();
		onChange && onChange(e);

		const val = e.target.value.trim();
		const valid = val === '' || VALID_COLOUR_RX.test(val);
		setValid(valid);

		if (valid) setV(val);
	};

	const _onInputChange = e => {
		e.persist();
		onChange && onChange(e);
		const val = e.target.value.trim();
		const valid = val === '' || VALID_COLOUR_RX.test(val);
		setValid(valid);

		setV(e.target.value);
	};

	return (
		<Generic
			prefix={(
				<>
					<input
						className={css.color}
						type="color"
						onChange={_onColourChange}
						defaultValue={defaultValue}
						name={name}
						ref={self}
					/>
					<span
						className={cx(
							css.preview,
							!valid && css.invalid,
						)}
						style={{backgroundColor:v}}
					/>
				</>
			)}
			type="text"
			value={v}
			onChange={_onInputChange}
			{...props}
			ref={ref}
		/>
	);
});

export default Color;
