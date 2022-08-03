import { ImageProps } from '../Image';
import React from 'react';
export declare const AVATAR_FRAGMENT: import("urql").TypedDocumentNode<any, object>;
export interface AvatarUser {
    id: string;
    friendlyName: string;
    avatar?: {
        srcset?: ImageProps;
        url?: string;
    };
}
export interface AvatarProps {
    El?: React.ElementType | string;
    flat?: boolean;
    user?: AvatarUser;
    className?: string;
    size?: 'tiny' | 'small' | 'large';
    squricle?: boolean;
    initials?: string;
}
declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<unknown>>;
export default Avatar;
