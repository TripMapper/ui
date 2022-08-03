import css from './style.module.scss';

export default function FilterBar ({ children }) {
	return (
		<div className={css.filterBar}>
			{children}
		</div>
	);
}
