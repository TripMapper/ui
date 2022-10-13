import { TransactionItemProps } from '../TransactionItem';
import { ReactFragment, ReactNode } from 'react';
export interface BudgetLayoutDay {
    day: number;
    total: number;
    date?: Date;
    cards: readonly TransactionItemProps[];
}
export interface BudgetLayoutProps {
    days: readonly BudgetLayoutDay[];
    total?: number;
    currency?: string;
    overBudget?: boolean;
    headingChildren?: ReactNode | ReactFragment;
    transactionsHeadingChildren?: ReactNode | ReactFragment;
    children?: ReactNode | ReactFragment;
}
export default function BudgetLayout({ total, currency, overBudget, headingChildren, transactionsHeadingChildren, days, children, }: BudgetLayoutProps): JSX.Element;
