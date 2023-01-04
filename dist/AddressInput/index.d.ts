/// <reference types="react" />
export interface Address {
    address1?: string;
    address2?: string;
    address3?: string;
    city?: string;
    state?: string;
    zip?: string;
    countryId?: string;
}
export interface AddressInputProps {
    name: string;
    required?: boolean;
    defaultValue?: Address;
}
export declare const ADDRESS_FRAGMENT: import("urql").TypedDocumentNode<any, object>;
export default function AddressInput({ name, required, defaultValue }: AddressInputProps): JSX.Element;
