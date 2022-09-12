import { AvatarUser } from '../Avatar';
import { ReactElement, ReactFragment, ReactNode } from 'react';
export interface UserCardProps {
    avatar?: AvatarUser;
    name?: string;
    role?: string;
    email?: string;
    menu?: ReactFragment | ReactElement | ReactNode;
}
export default function UserCard({ avatar, name, role, email, menu, }: UserCardProps): JSX.Element;
