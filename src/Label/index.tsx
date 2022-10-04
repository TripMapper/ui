import css from './styles.module.scss';
import { Children, cloneElement, isValidElement, ReactNode } from 'react';
import { cx } from '../util';

export interface LabelInputProps {
	group?: false;
	label: string;
	children: ReactNode;
	El?: "label" | "div";
	instructions?: string | ReactNode;
	inline?: boolean;
}

export interface LabelGroupProps {
	group: true;
	label: never;
	El: never;
	children: ReactNode;
	instructions: never;
	inline: never;
}

export type LabelProps = LabelInputProps | LabelGroupProps;

export default function Label ({ label, children, El = 'label', group = false, instructions, inline = false } : LabelProps) {
	if (group)
		return <div className={css.group}>{children}</div>;

	const merged = Children.count(children) > 1;
	if (merged) {
		if (El === 'label') El = 'div';
		children = Children.map(children, child => {
			if (!isValidElement(child)) return child;
			// @ts-ignore
			return cloneElement(child, { merged: true });
		}) as ReactNode;
	}

	return (
		<El className={cx(
			css.label,
			merged && css.merged,
			inline && css.inline,
		)}>
			<span>{label}</span>
			{merged ? <div>{children}</div> : children}
			{instructions && <small>{instructions}</small>}
		</El>
	);
}
