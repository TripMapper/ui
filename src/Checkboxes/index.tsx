import css from './style.module.scss';
import Checkbox, { CheckboxProps } from '../Checkbox';
import { useEffect, useRef, useState } from 'react';

export interface CheckboxesProps {
	name: string;
	options: Omit<CheckboxProps, 'name'|'required'>[];
	/**
	 * If true at least 1 is required, if a number at least X is required
	 * @default false
	 */
	required?: boolean | number;
}

export default function Checkboxes ({
	name,
	options,
	required = false,
} : CheckboxesProps) {
	const [refs, setRefs] = useState([])
		, checked = useRef(0);
	const addRef = ref => setRefs(
		o => ref !== null && o.indexOf(ref) === -1 ? [...o, ref] : o
	);

	useEffect(() => {
		setRefs([]);
	}, [options]);

	const onChange = e => {
		if (e.target.checked) checked.current++;
		else checked.current--;

		const enoughChecked = checked.current >= +(required as number);
		refs.forEach(input => {
			if (enoughChecked) input.removeAttribute('required');
			else input.setAttribute('required', 'true');
		});
	};

	useEffect(() => {
		refs.forEach(input => input.addEventListener('change', onChange));

		return () => {
			refs.forEach(input => input.removeEventListener('change', onChange));
		};
	}, [refs]);

	return (
		<ul className={css.checkboxes}>
			{options.map(opt => (
				<li key={opt.value}>
					<Checkbox
						{...opt}
						name={name}
						inputRef={required ? addRef : void 0}
						required={required as boolean}
					/>
				</li>
			))}
		</ul>
	);
}
