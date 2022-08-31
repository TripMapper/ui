import { useMemo } from 'react';
const gatherCards = data => {
    if (!data)
        return {};
    return data.trip.cardsList.reduce((a, b) => {
        if (!a.hasOwnProperty(b.day))
            a[b.day] = [];
        a[b.day].push(b);
        a[b.day].sort((a, b) => a.sorting - b.sorting);
        return a;
    }, {});
};
export default function useGatherBoardCards(data) {
    //*
    return useMemo(() => ({ current: gatherCards(data) }), [data]);
    /*/
    const [cards, setCards] = useState(gatherCards(data));

    useEffect(() => {
        setCards(gatherCards(data));
    }, [data]);

    return [cards, setCards];
    //*/
}
