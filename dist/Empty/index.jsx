import css from './style.module.scss';
export default function Empty({ children }) {
    return (<div className={css.empty}>
			{children}
		</div>);
}
