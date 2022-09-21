import css from './style.module.scss';
import Slideover from '../Slideover';
import { useEffect, useState } from 'react';
import { Listen, Signal, useListen } from '../util/signals';
import { gql } from 'urql';
import Image, { IMAGE_FRAGMENT } from '../Image';
import { cx, titleCase } from '../util';
import Copy from '../Copy';
import { substituteUrls } from '../Text';
import NextImage from 'next/image';

export interface ReadonlyCardSlideoverProps {
	card: any;
	cardId: string;
	onClose?: (cardId : string) => void;
}

export const READONLY_CARD_SLIDEOVER_FRAGMENT = gql`
	fragment ReadonlyCardSlideover on Card {
		id
		name
		type
		day
		duration
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
	}
	${IMAGE_FRAGMENT}
`;

export default function ReadonlyCardSlideover ({
	card,
	cardId,
	onClose,
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

	if (!card) return null;
	const { drawerImage, name, type, day, duration, notes, location } = card;

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
					<h4>{titleCase(type)}</h4>
				</header>
				<dl className={css.details}>
					<div>
						<dd>Start</dd>
						<dt>Day {day + 1}</dt>
					</div>
					<div>
						<dd>End</dd>
						<dt>Day {day + 1 + duration - 1}</dt>
					</div>
				</dl>
				<div className={css.innerContent}>
					{notes && (
						<>
							<header className={css.subHeader}>
								<h4>Notes</h4>
							</header>
							<Copy className={css.notes}>
								{substituteUrls(notes)}
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
