import css from './style.module.scss';
import { cx } from '../util';
export default function Tag({ children, margin = true, look = null, small = false, }) {
    return (<div className={cx(css.tag, margin && css.margin, look && css[look], small && css.small)}>
			{children}
		</div>);
}
export function TagGroup({ tags = [], limit = 2, small = false, }) {
    return (<div className={css.tagGroup}>
			{tags.slice(0, limit).map(tag => (<Tag key={tag.id} small={small} look={tag.look}>
					{tag.name}
				</Tag>))}
			{limit < tags.length && (<Tag small={small}>+{tags.length - limit}</Tag>)}
		</div>);
}
