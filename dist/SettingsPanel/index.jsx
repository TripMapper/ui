import css from './style.module.scss';
import Form from '../Form';
export default function SettingsPanel({ heading, text, onSubmit, children }) {
    return (<section className={css.settingsPanel}>
			<header className={css.header}>
				<h2>{heading}</h2>
				{text && <p>{text}</p>}
			</header>
			<Form onSubmit={onSubmit} className={css.form}>
				{children}
			</Form>
		</section>);
}
