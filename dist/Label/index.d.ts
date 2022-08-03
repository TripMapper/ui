import { ReactNode } from 'react';
export interface LabelInputProps {
    group: false;
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
export declare type LabelProps = LabelInputProps | LabelGroupProps;
export default function Label({ label, children, El, group }: LabelProps): JSX.Element;
