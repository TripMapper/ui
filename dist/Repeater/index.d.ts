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
    onBeforeDeleteClick?: (value: RepeaterValue) => void;
    byNodeId?: boolean;
    includeUpdateById?: boolean;
    /** @default false */
    groupFields?: boolean;
    setValues?: (values: readonly RepeaterValue[]) => void;
}
export default function Repeater({ name, addLabel, emptyValue, defaultValues, fields, max, onBeforeAddClick, onBeforeDeleteClick, byNodeId, includeUpdateById, groupFields, setValues, }: RepeaterProps): JSX.Element;
