import css from './style.module.scss';
import { cx } from '../util';

export interface SubHeadingProps {
	H?: 'h2' | 'h4';
	heading: string;
	text?: string;
	marginTop?: boolean;
}

export default function SubHeading ({
	H = 'h4',
	heading, text,
	marginTop = false,
} : SubHeadingProps) {
	return (
		<header className={cx(css.subHeading, marginTop && css.marginTop)}>
			<H>{heading}</H>
			{text && <p>{text}</p>}
		</header>
	);
}
