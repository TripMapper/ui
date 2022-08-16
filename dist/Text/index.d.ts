/// <reference types="react" />
export interface TextProps {
    defaultValue?: string;
    onChange?: (value: string) => void;
    className?: string;
    onWhite?: boolean;
    placeholder?: string;
}
export default function Text({ defaultValue, onChange, className, onWhite, placeholder, }: TextProps): JSX.Element;
