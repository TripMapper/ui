import { ReactNode } from 'react';
export interface CheckboxProps {
    name: string;
    /** @default "(bool)1" */
    value?: string;
    /** @default false */
    includeFalsyValue?: boolean;
    /** @default "(bool)0" */
    falsyValue?: string;
    /** @default false */
    required?: boolean;
    /** @default false */
    defaultChecked?: boolean;
    label?: string | ReactNode;
}
export default function Checkbox({ name, value, includeFalsyValue, falsyValue, required, defaultChecked, label, }: CheckboxProps): JSX.Element;
