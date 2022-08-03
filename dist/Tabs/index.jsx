import css from './style.module.scss';
import TabItem from './TabItem';
import { cx } from '../util';
export default function Tabs({ className, items, children, tabsLayoutId = 'tabsLayoutId' }) {
    return (<ul className={cx(css.ul, className)}>
			{items.map(item => (<TabItem tabLayoutId={tabsLayoutId} key={item.uri ?? item.name} {...item}/>))}

			{children && (<div className={css.kids}>{children}</div>)}
		</ul>);
}
