import Link from 'next/link';
import { LinkProps } from 'next/dist/client/link';
import { ReactNode } from 'react';

export interface AProps extends LinkProps {
	children?: ReactNode;
}

export default function A ({ href, ...props } : AProps) {
	return (
		<Link href={href} passHref>
			<a {...props} />
		</Link>
	);
}
