import css from './style.module.scss';
import Slideover from '../Slideover';
import { useMemo, useState } from 'react';
import { Signal, useListen } from '../util/signals';
import { gql } from 'urql';
import { formatTime } from '../util';
import Copy from '../Copy';
import { substituteUrls } from '../Text';
import NextImage from 'next/image';
import ordinal from '../util/ordinal';
import { DateTime } from 'luxon';
import { TRAVEL_TYPES } from '../Consts';
import PlaceDetails, { PLACE_DETAILS_FRAGMENT } from '../PlaceDetails';
import Header, { CARD_SLIDEOVER_HEADER_FRAGMENT } from './Header';
import Type, { CARD_SLIDEOVER_TYPE_FRAGMENT } from './Type';
export const CARD_SLIDEOVER_FRAGMENT = gql `
    fragment CardSlideover on Card {
        id
        type
        subType
        day
        duration
        startTime
        endTime
        location {
            address
            lat
            lng
        }
        notes
        place {
            ...PlaceDetails
        }
	    ...CardSlideoverHeader
	    ...CardSlideoverType
    }
    ${PLACE_DETAILS_FRAGMENT}
    ${CARD_SLIDEOVER_HEADER_FRAGMENT}
    ${CARD_SLIDEOVER_TYPE_FRAGMENT}
`;
export default function CardSlideover({ card, cardId, onClose, startDate, tripCurrency, readOnly = false, }) {
    const [isOpen, setIsOpen] = useState(true);
    const onRequestClose = () => {
        setIsOpen(false);
        onClose?.(cardId);
    };
    useListen(Signal.ShowReadonlyCard, id => {
        if (id !== cardId)
            onRequestClose();
    });
    useListen(Signal.HideReadonlyCard, id => {
        if (id === cardId || !id)
            onRequestClose();
    });
    const { start, end, startLabel, endLabel } = useMemo(() => {
        const ret = {
            start: '',
            end: '',
            startLabel: 'Start',
            endLabel: 'End',
        };
        switch (card.type.toLowerCase()) {
            case 'travel':
                ret.startLabel = 'Depart';
                ret.endLabel = 'Arrive';
                break;
            case 'accommodation':
                ret.startLabel = 'Check-in';
                ret.endLabel = 'Check-out';
                break;
        }
        if (!card)
            return ret;
        if (startDate) {
            let s = DateTime.fromISO(startDate), e = DateTime.fromISO(startDate);
            s = s.plus({ days: card.day });
            e = e.plus({ days: card.day + card.duration - 1 });
            ret.start = ordinal(s.toLocaleString({ day: 'numeric', month: 'long' }));
            ret.end = ordinal(e.toLocaleString({ day: 'numeric', month: 'long' }));
        }
        else {
            ret.start = `Day ${card.day + 1}`;
            ret.end = `Day ${card.day + 1 + card.duration - 1}`;
        }
        if (card.startTime)
            ret.start = <>{ret.start} <span>at</span> {formatTime(card.startTime)}</>;
        if (card.endTime)
            ret.end = <>{ret.end} <span>at</span> {formatTime(card.endTime)}</>;
        return ret;
    }, [card, startDate]);
    const notes = useMemo(() => {
        if (!card?.notes)
            return null;
        return substituteUrls(card.notes);
    }, [card]);
    if (!card)
        return null;
    const { type, location } = card;
    return (<Slideover allowClickThrough isOpen={isOpen} onRequestClose={onRequestClose} heading={() => null} stacks={false} contentClassName={css.content} medium>
			<div>
				<Header {...card} readOnly={readOnly}/>
				<Type {...card} readOnly={readOnly}/>
				<div className={css.details}>
					<dl>
						{card.type === 'TRAVEL' && (<div>
								<dd>Type</dd>
								<dt>{TRAVEL_TYPES[card.subType].label}</dt>
							</div>)}
						<div>
							<dd>{startLabel}</dd>
							<dt>{start}</dt>
						</div>
						<div>
							<dd>{endLabel}</dd>
							<dt>{end}</dt>
						</div>
					</dl>
					{card.place && (<PlaceDetails {...card.place} tripCurrency={tripCurrency}/>)}
				</div>
				<div className={css.innerContent}>
					{notes && (<>
							<header className={css.subHeader}>
								<h4>Notes</h4>
							</header>
							<Copy className={css.notes}>
								{notes}
							</Copy>
						</>)}
					{location && (<>
							<header className={css.subHeader}>
								<h4>Location</h4>
							</header>
							<figure className={css.location}>
								<figcaption>{location.address}</figcaption>
								<div>
									<i className={css[type.toLowerCase()]}/>
									<NextImage src={`https://api.mapbox.com/styles/v1/tripmapper/ckohgvnqy1a8y18qvub3exrm6/static/${location.lng},${location.lat},10/540x180@2x?access_token=${process.env.MAPBOX_TOKEN_STATIC ?? 'pk.eyJ1IjoidHJpcG1hcHBlciIsImEiOiJja2c5ZWpwdWswNjhmMzJtczBwa2hjcW1jIn0.PQcFF2sZIpiFSt5PNMYI3g'}&attribution=false&logo=false`} width={540} height={180} alt=""/>
								</div>
							</figure>
						</>)}
				</div>
			</div>
		</Slideover>);
}
