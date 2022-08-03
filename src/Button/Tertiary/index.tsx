import css from './style.module.scss';
import Generic, { GenericButtonProps } from '../Generic';
import { forwardRef } from 'react';

const Tertiary = forwardRef<HTMLButtonElement, GenericButtonProps>((props : GenericButtonProps, ref) => (
	<Generic {...props} className={css.tertiary} ref={ref} />
));

export default Tertiary;
