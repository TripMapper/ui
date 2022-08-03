import { ReactNode } from 'react';
export declare type RepeaterField = (defaultRowValue: any, name: string) => ReactNode;
export interface RepeaterValue {
    id: string;
    nodeId?: string;
    [key: string]: any;
}
export interface RepeaterProps {
    name: string;
    /** @default "+ Add" */
    addLabel?: string;
    /** @default {} */
    emptyValue?: Omit<RepeaterValue, "id">;
    defaultValues?: readonly RepeaterValue[];
    max?: number;
    fields: readonly RepeaterField[];
    onBeforeAddClick?: (value: RepeaterValue) => Promise<RepeaterValue>;
    deleteByNodeId?: boolean;
    includeUpdateById?: boolean;
}
export default function Repeater({ name, addLabel, emptyValue, defaultValues, fields, max, onBeforeAddClick, deleteByNodeId, includeUpdateById, }: RepeaterProps): JSX.Element;
