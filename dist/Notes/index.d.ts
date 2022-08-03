/// <reference types="react" />
export interface NotesMetadataValue {
    id: string;
    value: string;
}
export interface NotesProps {
    name?: string;
    placeholder?: string;
    defaultValue?: string | NotesMetadataValue;
    increaseSpacing?: boolean;
    asMetadata?: boolean;
    readOnly?: boolean;
}
export default function Notes({ name, placeholder, defaultValue, asMetadata, increaseSpacing, readOnly, }: NotesProps): JSX.Element;
