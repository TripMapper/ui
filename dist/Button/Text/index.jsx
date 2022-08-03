import css from './style.module.scss';
import Generic from '../Generic';
import { forwardRef } from 'react';
import cx from '../../util/cx';
const Text = forwardRef(({ children, ...props }, ref) => (<Generic {...props} className={cx(css.btn, props.busy && css.busy)} ref={ref}>
		{children}
	</Generic>));
export default Text;
