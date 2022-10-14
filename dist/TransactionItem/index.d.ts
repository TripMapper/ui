import { ReactNode } from 'react';
export declare const TRANSACTION_ITEM_FRAGMENT: import("urql").TypedDocumentNode<any, object>;
export interface TransactionItemProps {
    id: string;
    El?: ReactNode;
    name: string;
    type: string;
    status: string;
    budget: number;
    tripBudget: number;
    currency?: {
        iso: string;
    };
    tripCurrency?: {
        iso: string;
    };
    image?: any;
}
export default function TransactionItem({ El, id, name, type, status, image, budget, tripBudget, currency, tripCurrency, }: TransactionItemProps): JSX.Element;
