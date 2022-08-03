import css from './style.module.scss';
import Generic from '../Generic';
import { forwardRef } from 'react';
const Primary = forwardRef((props, ref) => (<Generic {...props} className={css.primary} ref={ref}/>));
export default Primary;
