import css from './style.module.scss';
import StarSVG from '../svg/star.svg';
import { useState } from 'react';
import { cx } from '../util';
const Star = ({ name, value, checked, onChange }) => {
    return (<label className={cx(checked && css.checked)}>
			<input type="radio" name={name} value={`(number)${value}`} defaultChecked={checked} onChange={onChange}/>
			<StarSVG />
		</label>);
};
export default function Rating({ name, defaultValue = 0, onChange = null, }) {
    const [checked, setChecked] = useState(defaultValue);
    const _onChange = e => {
        onChange && onChange(e);
        setChecked(+e.target.value.replace('(number)', ''));
    };
    return (<div className={css.rating}>
			{Array.from({ length: 5 }, (_, i) => (<Star key={i} name={name} value={5 - i} checked={5 - i === checked} onChange={_onChange}/>))}
		</div>);
}
