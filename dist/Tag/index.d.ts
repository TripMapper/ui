import { ReactNode } from 'react';
export interface TagProps {
    children: ReactNode;
    /** @default true */
    margin?: boolean;
    /** @default null */
    look?: 'accommodation' | 'activity' | 'food' | 'travel' | 'other';
    /** @default false */
    small?: boolean;
}
export default function Tag({ children, margin, look, small, }: TagProps): JSX.Element;
