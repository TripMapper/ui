import css from './style.module.scss';
import { cx } from '../util';
import Button from '../Button';
export default function Header({ pullUp, logo, menu, contextMenu, logoAction, contextAction, title, }) {
    return (<header className={cx(css.header, pullUp && css.pullUp)}>
			<div>
				{logo}
				{logoAction && (<Button size="tiny" flat onClick={logoAction.onClick} href={logoAction.href} className={css.action}>
						{logoAction.text}
					</Button>)}
				{title && <strong className={css.title} title={title}>{title}</strong>}
			</div>
			{menu}
			<div>
				{contextAction && (<Button size="tiny" flat onClick={contextAction.onClick} href={contextAction.href}>{contextAction.text}</Button>)}
				{contextMenu}
			</div>
		</header>);
}
