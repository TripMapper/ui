/// <reference types="react" />
import { ImageProps } from '../Image';
export declare const TRIP_CARD_MINI_FRAGMENT: import("urql").TypedDocumentNode<any, object>;
export interface TripCardMiniProps {
    id: string;
    name: string;
    startDate?: Date;
    endDate?: Date;
    image?: ImageProps;
    status: string;
}
export default function TripCardMini({ id, name, startDate, endDate, image, status, }: TripCardMiniProps): JSX.Element;
