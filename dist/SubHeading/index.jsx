import css from './style.module.scss';
import { cx } from '../util';
export default function SubHeading({ H = 'h4', heading, text, marginTop = false, }) {
    return (<header className={cx(css.subHeading, marginTop && css.marginTop)}>
			<H>{heading}</H>
			{text && <p>{text}</p>}
		</header>);
}
