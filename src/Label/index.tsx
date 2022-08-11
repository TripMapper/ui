import css from './styles.module.scss';
import { ReactNode } from 'react';

export interface LabelInputProps {
	group?: false;
	label: string;
	children: ReactNode;
	El?: "label" | "div";
}

export interface LabelGroupProps {
	group: true;
	label: never;
	El: never;
	children: ReactNode;
}

export type LabelProps = LabelInputProps | LabelGroupProps;

export default function Label ({ label, children, El = 'label', group = false } : LabelProps) {
	if (group)
		return <div className={css.group}>{children}</div>;

	return (
		<El className={css.label}>
			<span>{label}</span>
			{children}
		</El>
	);
}
