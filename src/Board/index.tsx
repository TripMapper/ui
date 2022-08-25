import css from './style.module.scss';
import { DateTime } from 'luxon';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { gql, useQuery } from 'urql';
import Card, { CARD_FRAGMENT } from '../Card';
import Notice from '../Notice';
import { useMemo } from 'react';
import ContextMenu, { ContextItemButton } from '../ContextMenu';
import ordinal from '../util/ordinal';
import Kebab from '../svg/kebab.svg';
import Button from '../Button';
import { cx } from '../util';

export default function Board ({ tripId }) {
	const [{ data, error, fetching }] = useQuery({
		query: gql`
			query Board ($id: UUID!) {
				trip (id: $id) {
					days
					startDate
					
					cardsList {
						day
						sorting
						...Card
					}
				}
			}
			${CARD_FRAGMENT}
		`,
		variables: { id: tripId },
	});

	const [days, cards, hasStartDate] = useMemo(() => {
		if (!data?.trip) return [[], {}];

		const { days, /*startDate,*/ cardsList } = data.trip;
		const startDate = (new Date).toISOString();
		const dt = startDate ? DateTime.fromISO(startDate) : null;

		return [
			Array.from({ length: days }, (_, d) => {
				const date = dt ? dt.plus({ days: d }) : null;

				return {
					key: d,
					index: d,
					label: date ? (
						<>
							{(d === 0 || date.day === 1) && (
								<small>{date.toLocaleString({ month: 'long' })}</small>
							)}
							<strong>
								{ordinal(date.toLocaleString({
									weekday: 'long',
									day: 'numeric',
								}))}
							</strong>
						</>
					) : (
						<strong>Day {d + 1}</strong>
					),
				};
			}),
			cardsList.reduce((a, b) => {
				if (!a.hasOwnProperty(b.day))
					a[b.day] = [];

				a[b.day].push(b);
				a[b.day].sort((a, b) => a.sorting - b.sorting);

				return a;
			}, {}),
			!!startDate,
		];
	}, [data]);

	if (fetching)
		return 'TODO: Skeleton';

	if (error)
		return (
			<Notice error className={css.error}>
				<strong>Uh oh!</strong>
				{error.message}
			</Notice>
		);

	return (
		<div className={css.board} style={{ '--cols': days.length } as any}>
			<DragDropContext>
				{days.map(day => (
					<div key={day.key} className={css.column}>
						<header className={cx(css.header, hasStartDate && css.hasDate)}>
							{day.label}
							<ContextMenu menu={<>
								<ContextItemButton text="Sort by time" onClick={() => {}} />
								<hr/>
								<ContextItemButton text="Add day before" icon="add-after" onClick={() => {}} />
								<ContextItemButton text="Add day after" icon="add-after" onClick={() => {}} />
								<hr/>
								<ContextItemButton text="Delete all cards" icon="bin" type="danger" onClick={() => {}} />
							</>}>
								<button><Kebab /></button>
							</ContextMenu>
						</header>

						<Droppable
							droppableId={`day_${day.index}`}
							type="column"
						>
							{provided => (
								<ul
									className={css.list}
									ref={provided.innerRef}
									{...provided.droppableProps}
								>
									{cards[day.index].map((card, i) => (
										<Draggable key={card.id} draggableId={card.id} index={i}>
											{provided => (
												<li
													key={card.id}
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													<Card {...card} />
												</li>
											)}
										</Draggable>
									))}
									{provided.placeholder}
									<li className={css.add}><Button wide flat>+ New Card</Button></li>
								</ul>
							)}
						</Droppable>
					</div>
				))}
			</DragDropContext>
		</div>
	);
}
