import css from './style.module.scss';
import Generic from '../Generic';
import { forwardRef } from 'react';
const Secondary = forwardRef((props, ref) => (<Generic {...props} className={css.secondary} ref={ref}/>));
export default Secondary;
