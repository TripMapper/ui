import css from './style.module.scss';
import Base from '../Base';
import { forwardRef } from 'react';
import cx from '../../util/cx';
const Generic = forwardRef(({ children, className, wide = false, size = 'medium', busy = false, noPadding = false, userClass, ...props }, ref) => (<Base ref={ref} className={cx(css.btn, className, userClass, wide && css.wide, busy && css.busy, size === 'tiny' && css.tiny, size === 'small' && css.small, size === 'large' && css.large, noPadding && css.noPadding)} {...props}>
		{children}
	</Base>));
export default Generic;
