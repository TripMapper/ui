import { ReactNode } from 'react';
export interface TableData {
    id: string;
    [key: string]: any;
}
export interface TableColumn {
    label: string;
    handle: string;
    renderer?: (any: any, TableData: any) => ReactNode;
    align: 'left' | 'center' | 'right';
}
export interface TableProps {
    columns: readonly TableColumn[];
    data: readonly TableData[];
    inline?: boolean;
    [key: string]: any;
}
export default function Table({ columns, data, inline, ...props }: TableProps): JSX.Element;
