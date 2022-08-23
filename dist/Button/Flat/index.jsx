import css from './style.module.scss';
import Generic from '../Generic';
import { forwardRef } from 'react';
const Flat = forwardRef((props, ref) => (<Generic {...props} className={css.flat} ref={ref}/>));
export default Flat;
