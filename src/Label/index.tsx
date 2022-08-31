import css from './styles.module.scss';
import { ReactNode } from 'react';

export interface LabelInputProps {
	group?: false;
	label: string;
	children: ReactNode;
	El?: "label" | "div";
	instructions?: string;
}

export interface LabelGroupProps {
	group: true;
	label: never;
	El: never;
	children: ReactNode;
	instructions: never;
}

export type LabelProps = LabelInputProps | LabelGroupProps;

export default function Label ({ label, children, El = 'label', group = false, instructions } : LabelProps) {
	if (group)
		return <div className={css.group}>{children}</div>;

	return (
		<El className={css.label}>
			<span>{label}</span>
			{children}
			{instructions && <small>{instructions}</small>}
		</El>
	);
}
