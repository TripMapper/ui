import css from './style.module.scss';
import { gql } from 'urql';
import Card, { CARD_FRAGMENT_BASE } from '../Card';
import useGatherBoardDays from '../Board/hooks/useGatherBoardDays';
import useGatherBoardCards from '../Board/hooks/useGatherBoardCards';
import { cx } from '../util';
import ReadonlyCardSlideover, {
	READONLY_CARD_SLIDEOVER_FRAGMENT
} from '../ReadonlyCardSlideover';
import { useRef, useState } from 'react';
import { Emit, Signal } from '../util/signals';

export const READONLY_BOARD_FRAGMENT = gql`
	fragment ReadonlyBoard on Trip {
		days
		startDate
		cardsList {
			day
			sorting
			...CardBase
			...ReadonlyCardSlideover
		}
	}
	${CARD_FRAGMENT_BASE}
	${READONLY_CARD_SLIDEOVER_FRAGMENT}
`;

export default function ReadonlyBoard ({ trip }) {
	const [activeCards, setActiveCards] = useState([]);

	const pushCard = id => {
		setActiveCards(o => {
			if (o.indexOf(id) > -1) return o;

			Emit(Signal.ShowReadonlyCard, id);
			return [...o, id];
		});
	};

	const popCard = id => setTimeout(() => {
		setActiveCards(o => {
			const next = [...o];
			next.splice(o.indexOf(id), 1);
			return next;
		});
	}, 300);

	const days = useGatherBoardDays(trip ? { trip } : null)
		, cards = useGatherBoardCards(trip ? { trip } : null)
		, cardsById = trip?.cardsList?.reduce((a, b) => { a[b.id] = b; return a; }, {}) ?? {}
		, hasStartDate = !!trip?.startDate;

	if (!trip)
		return 'skeleton';

	const onBoardBackgroundClick = e =>
		(e.target === e.currentTarget && activeCards.length > 0)
			&& Emit(Signal.HideReadonlyCard, null);

	return (
		<div className={css.overflow}>
			<div
				className={cx(css.board, activeCards.length > 0 && css.cardOpen)}
				style={{ '--cols': days.length } as any}
				onClick={onBoardBackgroundClick}
			>
				{days.map(day => (
					<div key={day.key} className={css.column}>
						<header className={cx(css.header, hasStartDate && css.hasDate)}>
							{day.label}
						</header>

						<ul className={css.list}>
							{(cards.current[day.index] ?? []).map(card => (
								<li key={card.id}>
									<Card {...card} onClick={pushCard} />
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
			{activeCards.map(id => (
				<ReadonlyCardSlideover
					card={cardsById[id]}
					cardId={id}
					key={id}
					onClose={popCard}
				/>
			))}
		</div>
	);
}
