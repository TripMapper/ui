import Primary from './Primary';
import Secondary from './Secondary';
import Tertiary from './Tertiary';
import { GenericButtonProps } from './Generic';
import Text from './Text';
import { forwardRef } from 'react';
import Dashed from './Dashed';
import Flat from './Flat';
import Danger from './Danger';

export interface ButtonProps extends GenericButtonProps {
	/** @default false */
	secondary?: boolean;
	/** @default false */
	tertiary?: boolean;
	/** @default false */
	text?: boolean;
	/** @default false */
	dashed?: boolean;
	/** @default false */
	flat?: boolean;
	/** @default false */
	danger?: boolean;

	className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
	secondary = false,
	tertiary = false,
	text = false,
	dashed = false,
	flat = false,
	danger = false,
	className,
	...props
} : ButtonProps, ref) => {
	// @ts-ignore
	props.userClass = className;

	if (secondary) return <Secondary {...props} ref={ref} />;
	if (tertiary) return <Tertiary {...props} ref={ref} />;
	if (text) return <Text {...props} ref={ref} />;
	if (dashed) return <Dashed {...props} ref={ref} />;
	if (flat) return <Flat {...props} ref={ref} />;
	if (danger) return <Danger {...props} ref={ref} />;
	return <Primary {...props} ref={ref} />;
});

export default Button;
