import { ImageProps } from '../Image';
import { ReactNode } from 'react';
export interface DetailedHeaderProps {
    image?: ImageProps;
    customImage?: ReactNode;
    prefix?: ReactNode;
    heading: string;
}
export default function DetailedHeader({ image, customImage, prefix, heading, }: DetailedHeaderProps): JSX.Element;
