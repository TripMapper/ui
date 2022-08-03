import { ActionMeta } from 'react-select';
import { TypedDocumentNode } from 'urql';
import { ReactNode } from 'react';
export interface SelectOption {
    label: string;
    value: string | number | boolean;
}
export interface SelectProps {
    name: string;
    /** @default false */
    isMulti?: boolean;
    /** @default false */
    isClearable?: boolean;
    options?: ReadonlyArray<SelectOption>;
    defaultValue?: SelectOption;
    query?: TypedDocumentNode;
    placeholder?: ReactNode;
    onChange?: (option: ReadonlyArray<SelectOption> | SelectOption | null, actionMeta: ActionMeta<SelectOption>) => void;
    /** @default false */
    inline?: boolean;
}
export default function Select({ name, isMulti, isClearable, options, defaultValue, query, placeholder, onChange, inline, }: SelectProps): JSX.Element;
