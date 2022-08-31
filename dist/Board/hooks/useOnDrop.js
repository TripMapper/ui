import { gql, useMutation } from 'urql';
const parseResult = result => ({
    id: result.draggableId,
    oldDay: +result.source.droppableId.replace('day_', ''),
    newDay: +result.destination.droppableId.replace('day_', ''),
    oldSort: result.source.index,
    newSort: result.destination.index,
});
async function onCardDrop(cards, result, move) {
    const { id, oldDay, newDay, oldSort, newSort } = parseResult(result);
    if (oldDay === newDay && oldSort === newSort)
        return;
    const previousState = structuredClone(cards.current);
    if (!cards.current.hasOwnProperty(newDay))
        cards.current[newDay] = [];
    const card = cards.current[oldDay][oldSort];
    cards.current[oldDay].splice(oldSort, 1);
    cards.current[newDay].splice(newSort, 0, card);
    const { error } = await move({
        id,
        sorting: newSort,
        day: newDay,
    });
    if (error) {
        cards.current = previousState;
        console.log(error);
        // TODO: notify of error
    }
}
async function onColumnDrop(cards, result, move) {
    const { oldSort, newSort } = parseResult(result);
    if (oldSort === newSort)
        return;
    const previousState = structuredClone(cards.current);
    const dir = newSort > oldSort ? 1 : -1, carry = cards.current[oldSort];
    let i = oldSort;
    if (dir > 0) {
        // +
        do {
            i++;
            cards.current[i - 1] = cards.current[i];
        } while (i <= newSort);
    }
    else {
        // -
        do {
            i--;
            cards.current[i + 1] = cards.current[i];
        } while (i >= newSort);
    }
    cards.current[newSort] = carry;
    const { error } = await move({
        to: newSort,
        from: oldSort,
    });
    if (error) {
        cards.current = previousState;
        console.log(error);
        // TODO: notify of error
    }
}
export default function useOnDrop(tripId, cards) {
    const [, moveCard] = useMutation(gql `
        mutation MoveCard (
            $id: UUID!
            $sorting: Int!
            $day: Int!
        ) {
            move (input: {
                id: $id
                sorting: $sorting
                day: $day
            }) {
                clientMutationId
            }
        }
	`);
    const [, moveColumn] = useMutation(gql `
        mutation MoveColumn (
            $tripId: UUID!
            $from: Int!
            $to: Int!
        ) {
            moveColumn (input: {
                tripId: $tripId
                from: $from
                to: $to
            }) {
                clientMutationId
            }
        }
	`);
    const moveColumnWithTripId = async (variables) => await moveColumn({
        ...variables,
        tripId,
    });
    return async (result) => {
        if (result.type === 'card')
            await onCardDrop(cards, result, moveCard);
        else
            await onColumnDrop(cards, result, moveColumnWithTripId);
    };
}
