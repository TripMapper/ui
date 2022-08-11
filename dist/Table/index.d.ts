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
}
export default function Table({ columns, data }: TableProps): JSX.Element;
