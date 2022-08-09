import { ChangeEventHandler } from 'react';
export interface RatingProps {
    name?: string;
    defaultValue?: number;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    readOnly?: boolean;
    small?: boolean;
}
export default function Rating({ name, defaultValue, onChange, readOnly, small, }: RatingProps): JSX.Element;
