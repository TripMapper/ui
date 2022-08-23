import { ReactNode } from 'react';
declare type SlideoverChild = (depth: number, isTop: boolean) => ReactNode;
declare type SlideoverHeading = (tabs: ReactNode) => ReactNode;
export interface SlideoverProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onEditClick?: () => void;
    onDeleteClick?: () => void;
    children: ReactNode | SlideoverChild | any;
    heading?: string | SlideoverHeading | null;
    wide?: boolean;
}
export interface SlideoverPanelProps {
    name: string;
    handle: string;
    icon?: ReactNode;
    children: ReactNode | SlideoverChild | any;
    /** @default false */
    defaultActive?: boolean;
}
declare const setAppElement: any;
declare const Panel: ({ name, handle, icon, children, defaultActive }: SlideoverPanelProps) => any;
export { setAppElement, Panel };
declare function Slideover({ isOpen, onRequestClose, heading, onEditClick, onDeleteClick, children, wide, }: SlideoverProps): JSX.Element;
declare namespace Slideover {
    var setAppElement: any;
}
export default Slideover;
