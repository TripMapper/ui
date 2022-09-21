/// <reference types="react" />
import { ImageProps } from '../Image';
export declare const CARD_FRAGMENT_BASE: import("urql").TypedDocumentNode<any, object>;
export declare const CARD_FRAGMENT: import("urql").TypedDocumentNode<any, object>;
export interface CardProps {
    id: string;
    name: string;
    type: string;
    image?: {
        srcset: ImageProps;
    };
    status?: string;
    notes?: string;
    attachments?: {
        totalCount: number;
    };
    location?: {
        address: string;
    };
    startTime?: string | Date;
    endTime?: string | Date;
    budget?: number;
    tripBudget?: number;
    parentId?: string;
    onClick?: (id: string) => void;
}
export default function Card({ id, onClick, name, type, image, status, notes, attachments, location, startTime, endTime, budget, tripBudget, parentId, }: CardProps): JSX.Element;
