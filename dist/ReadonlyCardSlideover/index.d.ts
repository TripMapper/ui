/// <reference types="react" />
export interface ReadonlyCardSlideoverProps {
    card: any;
    cardId: string;
    onClose?: (cardId: string) => void;
}
export declare const READONLY_CARD_SLIDEOVER_FRAGMENT: import("urql").TypedDocumentNode<any, object>;
export default function ReadonlyCardSlideover({ card, cardId, onClose, }: ReadonlyCardSlideoverProps): JSX.Element;
