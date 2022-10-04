import { ReactNode } from 'react';
export interface ExploreProductPanel {
    heading: string | ReactNode;
    text: string;
    image: string;
}
export interface ExploreProductProps {
    heading: string;
    text: string;
    items: readonly ExploreProductPanel[];
}
export default function ExploreProduct({ heading, text, items }: ExploreProductProps): JSX.Element;
