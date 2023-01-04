/// <reference types="react" />
export declare const METADATA_FRAGMENT: import("urql").TypedDocumentNode<any, object>;
export interface MetadataItem {
    id: string;
    primaryType: string;
    secondaryType?: string | null;
    value?: string | null;
    address?: any;
}
export interface MetadataProps {
    meta: readonly MetadataItem[];
}
export default function Metadata({ meta }: MetadataProps): JSX.Element;
