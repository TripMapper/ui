import { ActionMeta } from 'react-select';
import { TypedDocumentNode } from 'urql';
import { ReactNode } from 'react';
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';
export interface SelectOption {
    label: string | ReactNode;
    value: string | number | boolean;
    disabled?: boolean;
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
    defaultValue?: SelectOption | string | number | boolean;
    value?: SelectOption | string | number | boolean;
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
    filterOption?: ((option: FilterOptionOption<SelectOption>, inputValue: string) => boolean) | null;
    required?: boolean;
    merged?: boolean;
    resultsParse?: (data: Object, query: string) => ReadonlyArray<SelectOption>;
    classNameOverride?: string;
}
export default function Select({ name, isMulti, isClearable, isCreatable, options, defaultValue, placeholder, disabled, onChange, inline, query, queryVariables, preloadOptions, queryWhenEmpty, pathToNodes, filterOption, required, merged, resultsParse, value, classNameOverride, }: SelectProps): JSX.Element;
