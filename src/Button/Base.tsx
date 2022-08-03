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
} : BaseButtonPropsWithClassName, ref) => {
	const El = href ? A : 'button';

	const props = href ? {
		href,
		target,
		rel: target === '_blank' ? 'noreferrer' : '',
	} : {
		onClick,
		type,
	};

	return (
		<El
			className={className}
			disabled={disabled}
			/*@ts-ignore*/
			ref={ref}
			{...props}
		>
			{prefix}
			{children}
			{suffix}
		</El>
	);
});

export default Base;
