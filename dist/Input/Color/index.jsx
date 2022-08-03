import css from './style.module.scss';
import Generic from '../Generic';
import { useRef, useState } from 'react';
import cx from '../../util/cx';
const VALID_COLOUR_RX = /^#([0-9A-F]{3}){1,2}$/i;
export default function Color({ onChange, defaultValue, name, ...props }) {
    const self = useRef();
    const [v, setV] = useState(defaultValue ?? ''), [valid, _setValid] = useState(true);
    const setValid = v => {
        _setValid(v);
        self.current.setCustomValidity(v ? 'Invalid colour' : '');
    };
    const _onColourChange = e => {
        e.persist();
        onChange && onChange(e);
        const val = e.target.value.trim();
        const valid = val === '' || VALID_COLOUR_RX.test(val);
        setValid(valid);
        if (valid)
            setV(val);
    };
    const _onInputChange = e => {
        e.persist();
        onChange && onChange(e);
        const val = e.target.value.trim();
        const valid = val === '' || VALID_COLOUR_RX.test(val);
        setValid(valid);
        setV(e.target.value);
    };
    return (<Generic prefix={(<>
					<input className={css.color} type="color" onChange={_onColourChange} defaultValue={defaultValue} name={name} ref={self}/>
					<span className={cx(css.preview, !valid && css.invalid)} style={{ backgroundColor: v }}/>
				</>)} type="text" defaultValue={defaultValue} value={v} onChange={_onInputChange} {...props}/>);
}
