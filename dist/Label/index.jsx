import css from './styles.module.scss';
export default function Label({ label, children, El = 'label', group = false }) {
    if (group)
        return <div className={css.group}>{children}</div>;
    return (<El className={css.label}>
			<span>{label}</span>
			{children}
		</El>);
}
