/// <reference types="react" />
export default function Notice({ children, error, success, warning, }: {
    children: any;
    error?: boolean;
    success?: boolean;
    warning?: boolean;
}): JSX.Element;
