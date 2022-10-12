import { ReactNode } from 'react';
export interface PillProps {
    children: ReactNode;
    className?: string;
    muted?: boolean;
    large?: boolean;
    travel?: boolean;
    activity?: boolean;
    accommodation?: boolean;
    food?: boolean;
    other?: boolean;
    plus?: boolean;
    type?: 'travel' | 'activity' | 'accommodation' | 'food' | 'other';
}
export default function Pill({ children, className, muted, large, travel, activity, accommodation, food, other, plus, type, }: PillProps): JSX.Element;
