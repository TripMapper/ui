import css from './style.module.scss';
import { gql } from 'urql';
import Image, { IMAGE_FRAGMENT } from '../Image';
import { cx, formatCurrency, titleCase } from '../util';
import Pill from '../Pill';
import Icon from '../Icon';
import formatTime from '../util/formatTime';
import diffTime from '../util/diffTime';
export const CARD_FRAGMENT = gql `
	fragment Card on Card {
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
		budget
		tripBudget
		parentId
	}
	${IMAGE_FRAGMENT}
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
    return (<div onClick={() => onClick?.(id)} className={cx(css.wrap, parentId && css.child, type === 'ACTIVITY' && css.activity, type === 'ACCOMMODATION' && css.accommodation, type === 'TRAVEL' && css.travel, type === 'FOOD' && css.food, type === 'OTHER' && css.other)}>
			<div className={css.card} role="button">
				{image && !parentId && (<Image {...image.srcset} className={css.cover}/>)}

				<div className={css.title}>
					<div className={css.name}>
						<small>
							{titleCase(type)}
							{parentId && <Icon xs of="tick-circle"/>}
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
						{location && (<span>
								<Icon xs of="cog"/>
								<span>{location.address}</span>
							</span>)}
						{(attachments?.totalCount ?? 0) > 0 && <span><Icon xs of="attachment"/></span>}
						{notes && <span><Icon xs of="image"/></span>}
					</div>)}
			</div>
		</div>);
}
