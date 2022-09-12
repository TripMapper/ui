import css from './style.module.scss';
import Avatar, { AvatarUser } from '../Avatar';
import getInitials from '../util/getInitials';
import { ReactElement, ReactFragment, ReactNode, useState } from 'react';
import ContextMenu from '../ContextMenu';
import Meatballs from '../svg/meatballs.svg';
import { cx } from '../util';

export interface UserCardProps {
	avatar?: AvatarUser;
	name?: string;
	role?: string;
	email?: string;
	menu?: ReactFragment | ReactElement | ReactNode;
}

export default function UserCard ({
	avatar,
	name,
	role,
	email,
	menu,
} : UserCardProps) {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div className={cx(css.userCard, menuOpen && css.open)}>
			<Avatar flat user={avatar} initials={name ? getInitials(name) : void 0} />
			<div className={css.details}>
				<strong>{name} {role && <span>&mdash; {role}</span>}</strong>
				<small>{email}</small>
			</div>
			{menu && (
				<ContextMenu menu={menu} isOpen={setMenuOpen}>
					<button><Meatballs /></button>
				</ContextMenu>
			)}
		</div>
	);
}
