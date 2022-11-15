import { ReactNode } from 'react';
export interface LabelInputProps {
    group?: false;
    label: string;
    children: ReactNode;
    El?: "label" | "div";
    instructions?: string | ReactNode;
    inline?: boolean;
    columns: never;
}
export interface LabelGroupProps {
    group: true;
    label?: string;
    El: never;
    children: ReactNode;
    instructions: never;
    inline: never;
    columns?: string;
}
export declare type LabelProps = LabelInputProps | LabelGroupProps;
export default function Label({ label, children, El, group, instructions, inline, columns }: LabelProps): JSX.Element;
