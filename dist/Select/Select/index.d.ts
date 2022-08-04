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
    /** @default false */
    isCreatable?: boolean;
    options?: ReadonlyArray<SelectOption>;
    defaultValue?: SelectOption;
    placeholder?: ReactNode;
    /** @default false */
    disabled?: boolean;
    onChange?: (option: ReadonlyArray<SelectOption> | SelectOption | null, actionMeta: ActionMeta<SelectOption>) => void;
    /** @default false */
    inline?: boolean;
    query?: TypedDocumentNode;
    queryVariables?: {
        [key: string]: any;
    };
    /** @default false */
    preloadOptions?: boolean;
    pathToNodes?: string;
    /** @default false */
    queryWhenEmpty?: boolean;
}
export default function Select({ name, isMulti, isClearable, isCreatable, options, defaultValue, placeholder, disabled, onChange, inline, query, queryVariables, preloadOptions, pathToNodes, queryWhenEmpty, }: SelectProps): JSX.Element;
