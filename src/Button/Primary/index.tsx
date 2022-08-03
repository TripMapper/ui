import css from './style.module.scss';
import Generic, { GenericButtonProps } from '../Generic';
import { forwardRef } from 'react';

const Primary = forwardRef<HTMLButtonElement, GenericButtonProps>((props : GenericButtonProps, ref) => (
	<Generic {...props} className={css.primary} ref={ref} />
));

export default Primary;
