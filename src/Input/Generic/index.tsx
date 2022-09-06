import css from './style.module.scss';
import Base, { BaseInputProps } from '../Base';
import empty from '../../util/empty';
import { forwardRef, useState } from 'react';
import cx from '../../util/cx';

export interface GenericInputProps extends BaseInputProps {
	prefix?: any;
	suffix?: any;
	merged?: boolean;
}

const Generic = forwardRef<HTMLInputElement, GenericInputProps>(({ prefix, suffix, onFocus, onBlur, merged = false, ...props } : GenericInputProps, ref) => {
	const [hasFocus, setHasFocus] = useState(false);

	if (empty(prefix) && empty(suffix))
		return (
			<Base
				className={cx(css.input, css.style, merged && css.merged)}
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
		)}>
			{prefix}
			<Base
				className={css.input}
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
