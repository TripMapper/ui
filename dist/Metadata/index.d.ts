/// <reference types="react" />
export declare const METADATA_FRAGMENT: import("urql").TypedDocumentNode<any, object>;
export interface MetadataItem {
    id: string;
    primaryType: string;
    secondaryType?: string | null;
    value?: string | null;
    address?: any;
}
export interface MetadataContact {
    id: string;
    organisation?: {
        id: string;
        name: string;
    };
    person?: {
        id: string;
        name: string;
    };
}
export interface MetadataProps {
    meta: readonly MetadataItem[];
    contacts: readonly MetadataContact[];
    onContactClick: (id: string) => void;
}
export default function Metadata({ meta, contacts, onContactClick }: MetadataProps): JSX.Element;
