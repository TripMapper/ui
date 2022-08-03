import { MouseEventHandler } from 'react';
export interface ContextItemButtonProps {
    type?: undefined | "danger";
    text: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}
export default function ContextItemButton({ type, text, onClick }: ContextItemButtonProps): JSX.Element;
