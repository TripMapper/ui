import { ReactNode } from 'react';
import { FormSubmit } from '../Form';
export interface AuthImageProps {
    src: string;
    name?: string;
    credit?: string;
    url?: string;
}
export interface AuthLayoutProps {
    form: ReactNode;
    callout?: ReactNode;
    image?: AuthImageProps;
    onSubmit?: FormSubmit;
}
export default function AuthLayout({ form, callout, image, onSubmit, }: AuthLayoutProps): JSX.Element;
