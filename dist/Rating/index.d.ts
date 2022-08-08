import { ChangeEventHandler } from 'react';
export interface RatingProps {
    name: string;
    defaultValue?: number;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}
export default function Rating({ name, defaultValue, onChange, }: RatingProps): JSX.Element;
