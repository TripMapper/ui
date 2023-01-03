import Link from 'next/link';
import Image, { IMAGE_FRAGMENT } from '../Image';
import css from './style.module.scss';
import Icon from '../Icon';
import { gql } from 'urql';
import formatDateRange from '../util/formatDateRange';
import Pill from '../Pill';
export const TRIP_CARD_MINI_FRAGMENT = gql `
	fragment TripCardMini on Trip {
		id
		name
		startDate
		endDate
        image {
            id
            srcset (
                width: 40
                height: 40
            ) {
                ...Image
            }
        }
		status
	}
	${IMAGE_FRAGMENT}
`;
export default function TripCardMini({ id, name, startDate, endDate, image, status, }) {
    let pill = null;
    switch (status) {
        case 'DECLINED':
        case 'SENT':
        case 'DRAFT':
            pill = <Pill black large>Proposal</Pill>;
            break;
        default: {
            if (startDate) {
                const now = new Date();
                if (endDate < now)
                    pill = <Pill plus large>Past</Pill>;
                else if (startDate > now)
                    pill = <Pill other large>Upcoming</Pill>;
                else
                    pill = <Pill food large>Active</Pill>;
            }
        }
    }
    return (<Link href={`/trips/${id}`}>
			<a className={css.tripCardMini}>
				{image ? (<Image className={css.image} {...image.srcset} circle/>) : (<span className={css.icon}>
						<Icon of="earth" l/>
					</span>)}
				<div className={css.name}>
					<strong>{name}</strong>
					<small>{startDate && endDate && formatDateRange(startDate, endDate)}</small>
				</div>
				{pill}
			</a>
		</Link>);
}
