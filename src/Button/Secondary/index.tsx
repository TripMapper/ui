import css from './style.module.scss';
import Generic, { GenericButtonProps } from '../Generic';
import { forwardRef } from 'react';

const Secondary = forwardRef<HTMLButtonElement, GenericButtonProps>((props : GenericButtonProps, ref) => (
	<Generic {...props} className={css.secondary} ref={ref} />
));

export default Secondary;
