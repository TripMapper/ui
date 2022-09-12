import css from './style.module.scss';
import Form from '../Form';

export default function SettingsPanel ({ heading, text, onSubmit, children }) {
	return (
		<section className={css.settingsPanel}>
			<header className={css.header}>
				<h2>{heading}</h2>
				{text && (typeof text === 'string' ? <p>{text}</p> : text)}
			</header>
			{onSubmit ? (
				<Form onSubmit={onSubmit} className={css.form}>
					{children}
				</Form>
			) : (
				<div className={css.form}>
					{children}
				</div>
			)}
		</section>
	);
}
