/// <reference types="react" />
export interface ReadonlyCardSlideoverProps {
    card: any;
    cardId: string;
    onClose?: (cardId: string) => void;
    startDate?: string;
    tripCurrency?: string;
}
export declare const READONLY_CARD_SLIDEOVER_FRAGMENT: import("urql").TypedDocumentNode<any, object>;
export default function ReadonlyCardSlideover({ card, cardId, onClose, startDate, tripCurrency, }: ReadonlyCardSlideoverProps): JSX.Element;
