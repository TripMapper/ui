/// <reference types="react" />
export interface DefaultUploadValueProp {
    id: string;
    src: string;
    [key: string]: any;
}
export interface UploadProps {
    name: string;
    placeholder?: string;
    defaultValue?: DefaultUploadValueProp;
    previewType?: 'cover' | 'contain';
}
export declare const UPLOAD_COVER_FRAGMENT: import("urql").TypedDocumentNode<any, object>;
export declare const UPLOAD_CONTAIN_FRAGMENT: import("urql").TypedDocumentNode<any, object>;
export default function Upload({ name, placeholder, defaultValue, previewType, }: UploadProps): JSX.Element;
