/// <reference types="react" />
export interface CardSlideoverProps {
    card: any;
    cardId: string;
    onClose?: (cardId: string) => void;
    startDate?: string;
    tripCurrency?: string;
    readOnly?: boolean;
}
export declare const CARD_SLIDEOVER_FRAGMENT: import("urql").TypedDocumentNode<any, object>;
export default function CardSlideover({ card, cardId, onClose, startDate, tripCurrency, readOnly, }: CardSlideoverProps): JSX.Element;
