import css from './styles.module.scss';
export default function Label({ label, children, El = 'label', group = false, instructions }) {
    if (group)
        return <div className={css.group}>{children}</div>;
    return (<El className={css.label}>
			<span>{label}</span>
			{children}
			{instructions && <small>{instructions}</small>}
		</El>);
}
