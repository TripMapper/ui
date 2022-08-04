import { ChangeEventHandler } from 'react';
export interface RadioProps {
    name: string;
    prefix?: string;
    suffix?: string;
    value?: string;
    defaultChecked?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}
export default function Radio({ name, prefix, suffix, value, defaultChecked, onChange, }: RadioProps): JSX.Element;
