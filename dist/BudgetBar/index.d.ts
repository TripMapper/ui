/// <reference types="react" />
export declare type BudgetBarFill = {
    value: number;
    opacity: number;
};
export interface BudgetBarProps {
    fill: number | readonly BudgetBarFill[];
    /** @default false */
    tall?: boolean;
    /** @default false */
    danger?: boolean;
    /** @default 'mono' */
    theme?: 'mono' | 'accommodation' | 'activity' | 'food' | 'travel' | 'other';
    children?: any;
    /** @default 'USD' */
    currency?: string;
}
export interface BudgetBarLabelProps {
    label: string;
    value: string | number;
    /** @default false */
    grow?: boolean;
    /** @default false */
    muted?: boolean;
    /** @default false */
    danger?: boolean;
    /**
     * Do not set, will be replaced by BudgetBarProps.currency
     * @internal
     * */
    currency?: string;
}
export declare function BudgetBarLabel({ label, value, currency, grow, muted, danger, }: BudgetBarLabelProps): JSX.Element;
export default function BudgetBar({ fill, tall, danger, theme, children, currency, }: BudgetBarProps): JSX.Element;
