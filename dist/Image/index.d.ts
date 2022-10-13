import React from 'react';
export declare const IMAGE_FRAGMENT: import("urql").TypedDocumentNode<any, object>;
export interface ImageProps extends Omit<JSX.IntrinsicElements['picture'], 'style'> {
    width: number;
    height: number;
    src: string;
    srcset: string;
    srcsetWebp: string;
    placeholder?: string;
    alt?: string;
    readonly style?: React.CSSProperties;
    circle?: boolean;
}
export default function Image({ width, height, src, srcset, srcsetWebp, placeholder, alt, className, style, circle, ...props }: ImageProps): JSX.Element;
