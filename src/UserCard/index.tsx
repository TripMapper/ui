import css from './style.module.scss';
import Avatar, { AvatarUser } from '../Avatar';
import getInitials from '../util/getInitials';
import {
	CSSProperties,
	ReactElement,
	ReactFragment,
	ReactNode,
	useState
} from 'react';
import ContextMenu from '../ContextMenu';
import Meatballs from '../svg/meatballs.svg';
import { cx } from '../util';

export interface UserCardProps {
	avatar?: AvatarUser;
	name?: string;
	role?: string;
	email?: string;
	menu?: ReactFragment | ReactElement | ReactNode;
	className?: string;
	style?: CSSProperties;
}

export default function UserCard ({
	avatar,
	name,
	role,
	email,
	menu,
	className,
	style,
} : UserCardProps) {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div className={cx(
			css.userCard,
			menuOpen && css.open,
			menu && css.hoverable,
			className
		)} style={style}>
			<Avatar flat user={avatar} initials={name ? getInitials(name) : void 0} />
			<div className={css.details}>
				<strong>{name} {role && <span>&mdash; {role}</span>}</strong>
				<small>{email}</small>
			</div>
			{menu && (
				<ContextMenu menu={menu} isOpen={setMenuOpen}>
					<button type="button"><Meatballs /></button>
				</ContextMenu>
			)}
		</div>
	);
}
