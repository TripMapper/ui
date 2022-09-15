import { ReactNode } from 'react';
export interface LabelInputProps {
    group?: false;
    label: string;
    children: ReactNode;
    El?: "label" | "div";
    instructions?: string | ReactNode;
    inline?: boolean;
}
export interface LabelGroupProps {
    group: true;
    label: never;
    El: never;
    children: ReactNode;
    instructions: never;
    inline: never;
}
export declare type LabelProps = LabelInputProps | LabelGroupProps;
export default function Label({ label, children, El, group, instructions, inline }: LabelProps): JSX.Element;
