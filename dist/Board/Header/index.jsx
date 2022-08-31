import css from './style.module.scss';
import { cx } from '../../util';
import ContextMenu, { ContextItemButton } from '../../ContextMenu';
import Kebab from '../../svg/kebab.svg';
export default function Header({ hasStartDate, label }) {
    return (<header className={cx(css.header, hasStartDate && css.hasDate)}>
			{label}
			<ContextMenu menu={<>
				<ContextItemButton text="Sort by time" onClick={() => { }}/>
				<hr />
				<ContextItemButton text="Add day before" icon="add-after" onClick={() => { }}/>
				<ContextItemButton text="Add day after" icon="add-after" onClick={() => { }}/>
				<hr />
				<ContextItemButton text="Delete all cards" icon="bin" type="danger" onClick={() => { }}/>
			</>}>
				<button><Kebab /></button>
			</ContextMenu>
		</header>);
}
