import css from './style.module.scss';
import Base, { BaseButtonProps, BaseButtonPropsWithClassName } from '../Base';
import { forwardRef } from 'react';
import cx from '../../util/cx';

export interface GenericButtonProps extends BaseButtonProps {
	/** @default false */
	wide?: boolean;
	/** @default medium */
	size?: 'tiny' | 'small' | 'medium' | 'large';
	/** @default false */
	busy?: boolean;
	/** @default false */
	noPadding?: boolean;
}

export interface GenericButtonPropsWithClassName extends GenericButtonProps, BaseButtonPropsWithClassName {
	userClass?: string;
}

const Generic = forwardRef<HTMLButtonElement, GenericButtonPropsWithClassName>(({
	children,
	className,
	wide = false,
	size = 'medium',
	busy = false,
	noPadding = false,
	userClass,
	...props
} : GenericButtonPropsWithClassName, ref) => (
	<Base
		ref={ref}
		className={cx(
			css.btn,
			className,
			userClass,
			wide && css.wide,
			busy && css.busy,
			size === 'tiny' && css.tiny,
			size === 'small' && css.small,
			size === 'large' && css.large,
			noPadding && css.noPadding,
		)}
		{...props}
	>
		{children}
	</Base>
));


export default Generic;
