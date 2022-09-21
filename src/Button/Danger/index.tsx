import css from './style.module.scss';
import Generic, { GenericButtonProps } from '../Generic';
import { forwardRef } from 'react';

const Danger = forwardRef<HTMLButtonElement, GenericButtonProps>((props : GenericButtonProps, ref) => (
	<Generic {...props} className={css.danger} ref={ref} />
));

export default Danger;
