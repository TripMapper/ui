import { AvatarUser } from '../Avatar';
import { CSSProperties, ReactElement, ReactFragment, ReactNode } from 'react';
export interface UserCardProps {
    avatar?: AvatarUser;
    name?: string;
    role?: string;
    email?: string;
    menu?: ReactFragment | ReactElement | ReactNode;
    className?: string;
    style?: CSSProperties;
}
export default function UserCard({ avatar, name, role, email, menu, className, style, }: UserCardProps): JSX.Element;
