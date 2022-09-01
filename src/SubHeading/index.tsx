import css from './style.module.scss';

export interface SubHeadingProps {
	heading: string;
	text?: string;
}

export default function SubHeading ({ heading, text } : SubHeadingProps) {
	return (
		<header className={css.subHeading}>
			<h4>{heading}</h4>
			{text && <p>{text}</p>}
		</header>
	);
}
