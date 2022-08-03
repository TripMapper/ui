import css from './style.module.scss';
export default function Page({ heading, children }) {
    return (<section className={css.page}>
			<header className={css.heading}><h1>{heading}</h1></header>
			{children}
		</section>);
}
