import css from './style.module.scss';
import {
	ChangeEventHandler,
	FocusEventHandler,
	forwardRef,
	useCallback
} from 'react';
import { cx } from '../util';

export interface TextAreaProps {
	className?: string;

	name?: string | undefined;
	placeholder?: string | undefined;
	readOnly?: boolean | undefined;
	required?: boolean | undefined;
	value?: string | number | undefined;
	defaultValue?: string | number | undefined;

	/** @default 4 */
	rows?: number | undefined;

	onFocus?: FocusEventHandler<HTMLTextAreaElement> | undefined;
	onBlur?: FocusEventHandler<HTMLTextAreaElement> | undefined;
	onInput?: ChangeEventHandler<HTMLTextAreaElement> | undefined;
	onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
	className,
	onInput,
	rows = 4,
	...props
} : TextAreaProps, ref) => {
	const _onInput = useCallback(e => {
		e.persist();
		let { borderTopWidth, borderBottomWidth } = window.getComputedStyle(e.target) as any;
		borderTopWidth = +borderTopWidth.replace(/[^\d.]/g, '');
		borderBottomWidth = +borderBottomWidth.replace(/[^\d.]/g, '');
		e.target.style.height = '';
		e.target.style.height = (e.target.scrollHeight + borderTopWidth + borderBottomWidth) + 'px';
		onInput?.(e);
	}, [onInput]);

	return (
		<textarea
			{...props}
			onInput={_onInput}
			className={cx(css.textArea, className)}
			rows={rows}
			ref={ref}
		/>
	);
});

export default TextArea;
