import { ReactElement, ReactNode } from 'react';
export interface ClockObject {
    time: string;
    period: string;
    future: string;
}
export interface ClockProps {
    zone?: string;
    /** @default false */
    includeFuture?: boolean;
    children?: ((obj: ClockObject) => ReactNode);
}
export default function Clock({ zone, includeFuture, children, }: ClockProps): ReactElement<any, any>;
