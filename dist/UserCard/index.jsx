import css from './style.module.scss';
import Avatar from '../Avatar';
import getInitials from '../util/getInitials';
import ContextMenu from '../ContextMenu';
import Meatballs from '../svg/meatballs.svg';
export default function UserCard({ avatar, name, role, email, menu, }) {
    return (<div className={css.userCard}>
			<Avatar flat user={avatar} initials={name ? getInitials(name) : void 0}/>
			<div className={css.details}>
				<strong>{name} {role && <span>&mdash; {role}</span>}</strong>
				<small>{email}</small>
			</div>
			{menu && (<ContextMenu menu={menu}>
					<button><Meatballs /></button>
				</ContextMenu>)}
		</div>);
}
