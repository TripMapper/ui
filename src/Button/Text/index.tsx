import css from './style.module.scss';
import Generic, { GenericButtonProps } from '../Generic';
import { forwardRef } from 'react';
import cx from '../../util/cx';

const Text = forwardRef<HTMLButtonElement, GenericButtonProps>(({ children, ...props } : GenericButtonProps, ref) => (
	<Generic {...props} className={cx(
		css.btn,
		props.busy && css.busy,
	)} ref={ref}>
		{children}
	</Generic>
));

export default Text;
