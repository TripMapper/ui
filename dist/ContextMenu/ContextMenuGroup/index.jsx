import css from './style.module.scss';
export default function ContextMenuGroup({ El = 'div', children, }) {
    return /* @ts-ignore */ (<El className={css.group}>
			{children}
		</El>);
}
