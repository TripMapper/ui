import css from './style.module.scss';
import Checkbox from '../Checkbox';
import { useEffect, useRef, useState } from 'react';
export default function Checkboxes({ name, options, required = false, }) {
    const [refs, setRefs] = useState([]), checked = useRef(0);
    const addRef = ref => setRefs(o => ref !== null && o.indexOf(ref) === -1 ? [...o, ref] : o);
    useEffect(() => {
        setRefs([]);
    }, [options]);
    const onChange = e => {
        if (e.target.checked)
            checked.current++;
        else
            checked.current--;
        const enoughChecked = checked.current >= +required;
        refs.forEach(input => {
            if (enoughChecked)
                input.removeAttribute('required');
            else
                input.setAttribute('required', 'true');
        });
    };
    useEffect(() => {
        refs.forEach(input => input.addEventListener('change', onChange));
        return () => {
            refs.forEach(input => input.removeEventListener('change', onChange));
        };
    }, [refs]);
    return (<ul className={css.checkboxes}>
			{options.map(opt => (<li key={opt.value}>
					<Checkbox {...opt} name={name} inputRef={required ? addRef : void 0} required={required}/>
				</li>))}
		</ul>);
}
