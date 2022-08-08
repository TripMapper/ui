import { forwardRef, MouseEventHandler, ReactNode } from 'react';
import A from '../A';

export interface BaseButtonProps {
	children?: ReactNode | undefined;
	prefix?: any;
	suffix?: any;

	/** @default false */
	disabled?: boolean;

	onClick?: MouseEventHandler<HTMLButtonElement>;
	href?: string;
	target?: '_blank' | undefined;
	type?: 'button' | 'submit' | 'reset';
	El?: ReactNode;
}

export interface BaseButtonPropsWithClassName extends BaseButtonProps{
	className?: string;
}

const Base = forwardRef<HTMLButtonElement|HTMLAnchorElement, BaseButtonPropsWithClassName>(({
	className,

	children,
	prefix,
	suffix,

	disabled = false,

	onClick,

	href,
	target,
	type = 'submit',

	El = 'button',
} : BaseButtonPropsWithClassName, ref) => {
	const InEl = href ? A : El;

	const props = href ? {
		href,
		target,
		rel: target === '_blank' ? 'noreferrer' : '',
	} : {
		onClick,
		type,
	};

	return (
		/*@ts-ignore*/
		<InEl
			className={className}
			disabled={disabled}
			/*@ts-ignore*/
			ref={ref}
			{...props}
		>
			{prefix}
			{children}
			{suffix}
		</InEl>
	);
});

export default Base;
