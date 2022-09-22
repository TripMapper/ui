import css from './style.module.scss';
import { gql } from 'urql';
import Image, { IMAGE_FRAGMENT } from '../Image';
import { cx, formatCurrency, titleCase } from '../util';
import Pill from '../Pill';
import Icon from '../Icon';
import formatTime from '../util/formatTime';
import diffTime from '../util/diffTime';
export const CARD_FRAGMENT_BASE = gql `
	fragment CardBase on Card {
        id
        name
        type
        image {
            id
            srcset (
                width: 280
                height: 126
            ) {
                ...Image
            }
        }
        status
        notes
        attachments { totalCount }
        location { address }
        startTime
        endTime
        parentId
	}
    ${IMAGE_FRAGMENT}
`;
export const CARD_FRAGMENT = gql `
	fragment Card on Card {
		...CardBase
		budget
		tripBudget
	}
	${CARD_FRAGMENT_BASE}
`;
export default function Card({ id, onClick, name, type, image, status, notes, attachments, location, startTime, endTime, budget, tripBudget, parentId, }) {
    // TODO: switch to cost values for agents
    const amount = budget, tripAmount = tripBudget;
    const hasDetails = (startTime
        || endTime
        || amount
        || tripAmount);
    const hasMeta = !parentId && (location
        || (attachments?.totalCount ?? 0) > 0
        || notes);
    return (<div onClick={() => onClick?.(id, parentId)} className={cx(css.wrap, parentId && css.child, type === 'ACTIVITY' && css.activity, type === 'ACCOMMODATION' && css.accommodation, type === 'TRAVEL' && css.travel, type === 'FOOD' && css.food, type === 'OTHER' && css.other)}>
			<div className={css.card} role="button">
				{image && !parentId && (<Image {...image.srcset} className={css.cover}/>)}

				<div className={css.title}>
					<div className={css.name}>
						<small>
							{titleCase(type)}
							{parentId && (<svg xmlns="http://www.w3.org/2000/svg" width="6" height="9" viewBox="0 0 6 9"><path fill="#2C2825" d="M2043.91406,268.226562 L2047.96875,268.226562 C2048.27604,268.226562 2048.50521,268.147786 2048.65625,267.990234 C2048.80729,267.832682 2048.88281,267.58724 2048.88281,267.253906 L2048.88281,264.113281 C2048.88281,263.785156 2048.80729,263.542969 2048.65625,263.386719 C2048.50521,263.230469 2048.27604,263.152344 2047.96875,263.152344 L2043.92188,263.152344 C2043.61719,263.152344 2043.38737,263.230469 2043.23242,263.386719 C2043.07747,263.542969 2043,263.785156 2043,264.113281 L2043,267.253906 C2043,267.58724 2043.07617,267.832682 2043.22852,267.990234 C2043.38086,268.147786 2043.60938,268.226562 2043.91406,268.226562 Z M2043.75,263.511719 L2045,263.511719 L2045,262.246094 C2045,262.035156 2045.03971,261.852865 2045.11914,261.699219 C2045.19857,261.545573 2045.30924,261.426432 2045.45117,261.341797 C2045.5931,261.257161 2045.75651,261.214844 2045.94141,261.214844 C2046.1263,261.214844 2046.28971,261.257161 2046.43164,261.341797 C2046.57357,261.426432 2046.68424,261.545573 2046.76367,261.699219 C2046.8431,261.852865 2046.88281,262.035156 2046.88281,262.246094 L2046.88281,263.511719 L2048.13281,263.511719 L2048.13281,262.28125 C2048.13281,261.898438 2048.07096,261.563802 2047.94727,261.277344 C2047.82357,260.990885 2047.6569,260.753255 2047.44727,260.564453 C2047.23763,260.375651 2047.0026,260.234375 2046.74219,260.140625 C2046.48177,260.046875 2046.21484,260 2045.94141,260 C2045.66797,260 2045.40039,260.046875 2045.13867,260.140625 C2044.87695,260.234375 2044.64193,260.375651 2044.43359,260.564453 C2044.22526,260.753255 2044.05924,260.990885 2043.93555,261.277344 C2043.81185,261.563802 2043.75,261.898438 2043.75,262.28125 L2043.75,263.511719 Z" transform="translate(-2043 -260)"/></svg>)}
						</small>
						<strong>{name || 'New Card'}</strong>
					</div>
					{status === 'TO_BOOK' && !parentId && (<Pill className={css.pill}>To Book</Pill>)}
				</div>

				{hasDetails && (<div className={css.details}>
						{startTime && endTime
                ? (<span>
									{formatTime(startTime)} &rarr; {formatTime(endTime)}
									&nbsp;
									<small>{diffTime(startTime, endTime)}</small>
								</span>) : startTime || endTime ? (<span>
									{type === 'ACCOMMODATION' && <small>{startTime ? 'Check-in' : 'Check-out'}&nbsp;</small>}
									{type === 'TRAVEL' && <small>{startTime ? 'Depart' : 'Arrive'}&nbsp;</small>}
									{formatTime(startTime ?? endTime)}
								</span>) : (<span />)}

						{amount && (<span>
								{/* TODO: Get correct currencies */}
								{tripAmount && tripAmount !== amount ? (<>
										{formatCurrency(tripAmount, 'GBP', true)}
										<small>&nbsp;{formatCurrency(amount, 'USD', true)}</small>
									</>) : formatCurrency(amount, 'USD', true)}
							</span>)}
					</div>)}

				{hasMeta && (<div className={css.meta}>
						{location ? (<span>
								<Icon xs of="location" className={css.locationIcon}/>
								<span>{location.address}</span>
							</span>) : <span className={css.empty}/>}
						{(attachments?.totalCount ?? 0) > 0 && <span><Icon xs of="attachment"/></span>}
						{notes && <span><Icon xs of="notes"/></span>}
					</div>)}
			</div>
		</div>);
}
