import { ReactNode } from 'react';
declare type ListWithActionItem = {
    key: string;
    value: ReactNode;
    action: ReactNode;
};
interface ListWithActionProps {
    items: readonly ListWithActionItem[];
}
export default function ListWithAction({ items }: ListWithActionProps): JSX.Element;
export {};
