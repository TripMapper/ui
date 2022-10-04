import { CSSProperties, ReactNode } from 'react';
export interface ExploreProductPanel {
    heading: string | ReactNode;
    text: string;
    image: string;
}
export interface ExploreProductProps {
    heading: string;
    text: string;
    items: readonly ExploreProductPanel[];
    className?: string;
    style?: CSSProperties;
}
export default function ExploreProduct({ heading, text, items, className, style }: ExploreProductProps): JSX.Element;
