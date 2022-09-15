import css from './style.module.scss';
import Checkbox, { CheckboxProps } from '../Checkbox';

export interface CheckboxesProps {
	name: string;
	options: Omit<CheckboxProps, 'name'>[];
}

export default function Checkboxes ({
	name,
	options,
} : CheckboxesProps) {
	return (
		<ul className={css.checkboxes}>
			{options.map(opt => (
				<li key={opt.value}>
					<Checkbox
						{...opt}
						name={name}
					/>
				</li>
			))}
		</ul>
	);
}
