/// <reference types="react" />
export interface SubHeadingProps {
    H?: 'h2' | 'h4';
    heading: string;
    text?: string;
    marginTop?: boolean;
}
export default function SubHeading({ H, heading, text, marginTop, }: SubHeadingProps): JSX.Element;
