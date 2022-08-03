import css from './style.module.scss';
import Generic from '../Generic';
import { forwardRef } from 'react';
const Tertiary = forwardRef((props, ref) => (<Generic {...props} className={css.tertiary} ref={ref}/>));
export default Tertiary;
