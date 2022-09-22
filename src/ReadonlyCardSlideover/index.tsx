import css from './style.module.scss';
import Slideover from '../Slideover';
import { ReactNode, useMemo, useState } from 'react';
import { Signal, useListen } from '../util/signals';
import { gql } from 'urql';
import Image, { IMAGE_FRAGMENT } from '../Image';
import { cx, formatTime, titleCase } from '../util';
import Copy from '../Copy';
import { substituteUrls } from '../Text';
import NextImage from 'next/image';
import ordinal from '../util/ordinal';
import { DateTime } from 'luxon';
import { PRIMARY_TYPES, TRAVEL_TYPES } from '../Consts';
import PlaceDetails, { PLACE_DETAILS_FRAGMENT } from '../PlaceDetails';

export interface ReadonlyCardSlideoverProps {
	card: any;
	cardId: string;
	onClose?: (cardId : string) => void;
	startDate?: string;
	tripCurrency?: string;
}

export const READONLY_CARD_SLIDEOVER_FRAGMENT = gql`
	fragment ReadonlyCardSlideover on Card {
		id
		name
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
        drawerImage: image {
            id
            srcset (
                width: 600
                height: 280
            ) {
                ...Image
            }
        }
		notes
		place {
			...PlaceDetails
		}
	}
	${IMAGE_FRAGMENT}
	${PLACE_DETAILS_FRAGMENT}
`;

export default function ReadonlyCardSlideover ({
	card,
	cardId,
	onClose,
	startDate,
	tripCurrency,
} : ReadonlyCardSlideoverProps) {
	const [isOpen, setIsOpen] = useState(true);

	const onRequestClose = () => {
		setIsOpen(false);
		onClose?.(cardId);
	};

	useListen(Signal.ShowReadonlyCard, id => {
		if (id !== cardId) onRequestClose();
	});

	useListen(Signal.HideReadonlyCard, id => {
		if (id === cardId || !id) onRequestClose();
	});

	const { start, end, startLabel, endLabel } = useMemo(() => {
		const ret = {
			start: '',
			end: '',
			startLabel: 'Start',
			endLabel: 'End',
		} as {
			start: string | ReactNode,
			end: string | ReactNode,
			startLabel: string,
			endLabel: string,
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

		if (!card) return ret;

		if (startDate) {
			let s = DateTime.fromISO(startDate),
				e = DateTime.fromISO(startDate);

			s = s.plus({ days: card.day });
			e = e.plus({ days: card.day + card.duration - 1 });

			ret.start = ordinal(s.toLocaleString({ day: 'numeric', month: 'long' }));
			ret.end = ordinal(e.toLocaleString({ day: 'numeric', month: 'long' }));
		} else {
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
		if (!card?.notes) return null;

		return substituteUrls(card.notes);
	}, [card]);

	if (!card) return null;
	const { drawerImage, name, type, location } = card;

	return (
		<Slideover
			allowClickThrough
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			heading={() => null}
			stacks={false}
			contentClassName={css.content}
			medium
		>
			<div>
				<header className={cx(css.header, css[type.toLowerCase()])}>
					{drawerImage && <Image {...drawerImage.srcset} />}

					<h2>{name}</h2>
				</header>
				<header className={cx(css.type, css[type.toLowerCase()])}>
					<h4>{PRIMARY_TYPES[type].label}</h4>
				</header>
				<div className={css.details}>
					<dl>
						{card.type === 'TRAVEL' && (
							<div>
								<dd>Type</dd>
								<dt>{TRAVEL_TYPES[card.subType].label}</dt>
							</div>
						)}
						<div>
							<dd>{startLabel}</dd>
							<dt>{start}</dt>
						</div>
						<div>
							<dd>{endLabel}</dd>
							<dt>{end}</dt>
						</div>
					</dl>
					{card.place && (
						<PlaceDetails {...card.place} tripCurrency={tripCurrency} />
					)}
				</div>
				<div className={css.innerContent}>
					{notes && (
						<>
							<header className={css.subHeader}>
								<h4>Notes</h4>
							</header>
							<Copy className={css.notes}>
								{notes}
							</Copy>
						</>
					)}
					{location && (
						<>
							<header className={css.subHeader}>
								<h4>Location</h4>
							</header>
							<figure className={css.location}>
								<figcaption>{location.address}</figcaption>
								<div>
									<i className={css[type.toLowerCase()]} />
									<NextImage
										src={`https://api.mapbox.com/styles/v1/tripmapper/ckohgvnqy1a8y18qvub3exrm6/static/${location.lng},${location.lat},10/540x180@2x?access_token=${process.env.MAPBOX_TOKEN_STATIC ?? 'pk.eyJ1IjoidHJpcG1hcHBlciIsImEiOiJja2c5ZWpwdWswNjhmMzJtczBwa2hjcW1jIn0.PQcFF2sZIpiFSt5PNMYI3g'}&attribution=false&logo=false`}
										width={540}
										height={180}
										alt=""
									/>
								</div>
							</figure>
						</>
					)}
				</div>
			</div>
		</Slideover>
	);
}
