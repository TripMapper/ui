import css from './style.module.scss';
import Generic, { GenericButtonProps } from '../Generic';
import { forwardRef } from 'react';

const Flat = forwardRef<HTMLButtonElement, GenericButtonProps>((props : GenericButtonProps, ref) => (
	<Generic {...props} className={css.flat} ref={ref} />
));

export default Flat;
