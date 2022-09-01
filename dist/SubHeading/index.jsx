import css from './style.module.scss';
export default function SubHeading({ heading, text }) {
    return (<header className={css.subHeading}>
			<h4>{heading}</h4>
			{text && <p>{text}</p>}
		</header>);
}
