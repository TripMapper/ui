import css from './style.module.scss';
import Base, { BaseInputProps } from '../Base';
import empty from '../../util/empty';
import { forwardRef, useState } from 'react';
import cx from '../../util/cx';
import getBrowser from '../../util/getBrowser';

export interface GenericInputProps extends BaseInputProps {
	prefix?: any;
	suffix?: any;
	merged?: boolean;
	invalid?: boolean;
}

const Generic = forwardRef<HTMLInputElement, GenericInputProps>(({
	prefix, suffix, onFocus, onBlur, merged = false,
	invalid = false, ...props
} : GenericInputProps, ref) => {
	const [hasFocus, setHasFocus] = useState(false);

	if (empty(prefix) && empty(suffix))
		return (
			<Base
				className={cx(
					css.input,
					css.style,
					merged && css.merged,
					invalid && css.invalid,
					getBrowser() === 'safari' && css.safari
				)}
				onFocus={onFocus}
				onBlur={onBlur}
				{...props}
				ref={ref}
			/>
		);

	const _onFocus = e => {
		e.persist();
		onFocus && onFocus(e);
		setHasFocus(true);
	};

	const _onBlur = e => {
		e.persist();
		onBlur && onBlur(e);
		setHasFocus(false);
	};

	return (
		<label className={cx(
			css.label,
			css.style,
			hasFocus && css.focus,
			!empty(prefix) && css.prefix,
			!empty(suffix) && css.suffix,
			merged && css.merged,
			invalid && css.invalid,
		)}>
			{prefix}
			<Base
				className={cx(css.input, getBrowser() === 'safari' && css.safari)}
				onFocus={_onFocus}
				onBlur={_onBlur}
				{...props}
				ref={ref}
			/>
			{suffix}
		</label>
	);
});

export default Generic;
