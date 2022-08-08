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
}
export default function Upload({ name, placeholder, defaultValue, }: UploadProps): JSX.Element;
