import css from './style.module.scss';
import Avatar, { AVATAR_FRAGMENT } from '../Avatar';
import { gql } from 'urql';
import getInitials from '../util/getInitials';
export const CLIENT_PERSON_CARD_FRAGMENT = gql `
	fragment ClientPersonCard on ClientPerson {
		id
		givenName
		familyName
		user {
            ...Avatar
        }
		address: metadataList (
			first: 1
			filter: { primaryType: { equalTo: ADDRESS } }
		) {
			id
			value
		}
	}
	${AVATAR_FRAGMENT}
`;
export default function ClientPersonCard({ givenName, familyName, user, address, }) {
    return (<div className={css.clientPersonCard}>
			<Avatar className={css.avatar} user={user} flat squricle initials={getInitials(`${givenName} ${familyName}`)}/>
			<div>
				<strong>{givenName} {familyName}</strong>
				<small>{address?.[0]?.value}</small>
			</div>
		</div>);
}
