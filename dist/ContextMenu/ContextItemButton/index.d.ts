import { MouseEventHandler } from 'react';
import { Icons } from '../../Types';
export interface ContextItemButtonProps {
    type?: undefined | "danger";
    text: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    icon?: Icons;
}
export default function ContextItemButton({ type, text, onClick, icon }: ContextItemButtonProps): JSX.Element;
