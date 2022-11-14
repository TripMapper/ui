import { ElementType } from 'react';
interface DropzoneProps {
    children?: any;
    onChange?: (files: any) => {};
    accept?: string;
    className?: string;
    hoverClassName?: string;
    El?: string | ElementType;
    [key: string]: any;
}
export default function Dropzone({ children, onChange, className, accept, El, hoverClassName, ...props }: DropzoneProps): JSX.Element;
export {};
