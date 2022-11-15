import css from './styles.module.scss';
import { Children, cloneElement, isValidElement } from 'react';
import { cx } from '../util';
export default function Label({ label, children, El = 'label', group = false, instructions, inline = false, columns }) {
    if (group)
        return (<div className={css.label}>
				{label && <span>{label}</span>}
				<div className={css.group} style={{ '--cols': columns }}>{children}</div>
			</div>);
    const merged = Children.count(children) > 1;
    if (merged) {
        if (El === 'label')
            El = 'div';
        children = Children.map(children, child => {
            if (!isValidElement(child))
                return child;
            // @ts-ignore
            return cloneElement(child, { merged: true });
        });
    }
    return (<El className={cx(css.label, merged && css.merged, inline && css.inline)}>
			<span>{label}</span>
			{merged ? <div>{children}</div> : children}
			{instructions && <small>{instructions}</small>}
		</El>);
}
