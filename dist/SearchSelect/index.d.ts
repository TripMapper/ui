import { ReactNode } from 'react';
import { SelectOption } from '../Select/Select';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
interface SelectOptionWithData extends SelectOption {
    [key: string]: any;
}
export interface SearchSelectProps {
    placeholder?: string;
    query: TypedDocumentNode;
    pathToNodes: string;
    onSelect: (option: SelectOptionWithData) => void;
    itemRenderer?: (data: SelectOptionWithData, children: ReactNode) => ReactNode;
    excludeIds: readonly string[];
    preloadOptions?: boolean;
    queryWhenEmpty?: boolean;
}
export default function SearchSelect({ placeholder, pathToNodes, onSelect, query, itemRenderer, excludeIds, preloadOptions, queryWhenEmpty, }: SearchSelectProps): JSX.Element;
export {};
