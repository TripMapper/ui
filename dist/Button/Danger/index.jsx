import css from './style.module.scss';
import Generic from '../Generic';
import { forwardRef } from 'react';
const Danger = forwardRef((props, ref) => (<Generic {...props} className={css.danger} ref={ref}/>));
export default Danger;
