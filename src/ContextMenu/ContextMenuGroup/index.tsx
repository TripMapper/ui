import css from './style.module.scss';
import { ReactNode } from 'react';

interface ContextMenuGroupProps {
	El?: string | ReactNode;
	children?: any;
}

export default function ContextMenuGroup ({
	El = 'div',
	children,
} : ContextMenuGroupProps) {
	return /* @ts-ignore */ (
		<El className={css.group}>
			{children}
		</El>
	);
}
