import css from './style.module.scss';
import Checkbox from '../Checkbox';
export default function Checkboxes({ name, options, }) {
    return (<ul className={css.checkboxes}>
			{options.map(opt => (<li key={opt.value}>
					<Checkbox {...opt} name={name}/>
				</li>))}
		</ul>);
}
