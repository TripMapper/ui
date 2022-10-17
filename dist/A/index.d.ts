import { LinkProps } from 'next/dist/client/link';
import { ReactNode } from 'react';
export interface AProps extends LinkProps {
    children?: ReactNode;
    [key: string]: any;
}
export default function A({ href, ...props }: AProps): JSX.Element;
