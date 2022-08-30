import css from './style.module.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { gql, useQuery } from 'urql';
import { CARD_FRAGMENT } from '../Card';
import Notice from '../Notice';
import Column from './Column';
import useGatherBoardDays from './hooks/useGatherBoardDays';
import useGatherBoardCards from './hooks/useGatherBoardCards';
import useOnDrop from './hooks/useOnDrop';

const BOARD_QUERY = gql`
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
`;

export default function Board ({ tripId }) {
	const [{ data, error, fetching }] = useQuery({
		query: BOARD_QUERY,
		variables: { id: tripId },
	});

	const days = useGatherBoardDays(data)
		, cards = useGatherBoardCards(data)
		, hasStartDate = !!data?.startDate;

	const onDrop = useOnDrop(tripId, cards);

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
		<DragDropContext
			onDragEnd={onDrop}
		>
			<Droppable
				droppableId="board"
				type="column"
				direction="horizontal"
			>
				{provided => (
					<div
						className={css.board}
						style={{ '--cols': days.length } as any}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{days.map(day => (
							<Column
								key={day.key}
								day={day}
								hasStartDate={hasStartDate}
								cards={cards.current[day.index] ?? []}
							/>
						))}

						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}
