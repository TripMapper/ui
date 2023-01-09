import { useTranslation } from 'react-i18next';
const T = ({ v }) => {
    const { t } = useTranslation();
    return v(t);
};
export const PRIMARY_TYPES = {
    TRAVEL: { label: <T v={t => t('TRAVEL', 'Travel')}/>, value: 'TRAVEL' },
    ACTIVITY: { label: <T v={t => t('ACTIVITY', 'Activity')}/>, value: 'ACTIVITY' },
    ACCOMMODATION: { label: <T v={t => t('ACCOMMODATION', 'Accommodation')}/>, value: 'ACCOMMODATION' },
    FOOD: { label: <T v={t => t('FOOD', 'Food')}/>, value: 'FOOD' },
    OTHER: { label: <T v={t => t('OTHER', 'Other')}/>, value: 'OTHER' },
};
export const TRAVEL_TYPES = {
    TRAVEL_FLIGHT: { label: <T v={t => t('TRAVEL_FLIGHT', 'Flight')}/>, value: 'TRAVEL_FLIGHT' },
    TRAVEL_DRIVE: { label: <T v={t => t('TRAVEL_DRIVE', 'Drive')}/>, value: 'TRAVEL_DRIVE' },
    TRAVEL_TAXI: { label: <T v={t => t('TRAVEL_TAXI', 'Taxi')}/>, value: 'TRAVEL_TAXI' },
    TRAVEL_BOAT: { label: <T v={t => t('TRAVEL_BOAT', 'Boat')}/>, value: 'TRAVEL_BOAT' },
    TRAVEL_PUBLIC_TRANSPORT: { label: <T v={t => t('TRAVEL_PUBLIC_TRANSPORT', 'Public Transport')}/>, value: 'TRAVEL_PUBLIC_TRANSPORT' },
    TRAVEL_CYCLE: { label: <T v={t => t('TRAVEL_CYCLE', 'Cycle')}/>, value: 'TRAVEL_CYCLE' },
    TRAVEL_WALK: { label: <T v={t => t('TRAVEL_WALK', 'Walk')}/>, value: 'TRAVEL_WALK' },
};
export const ACCOMMODATION_TYPES = {
    ACCOMMODATION_BED_ONLY: { label: <T v={t => t('ACCOMMODATION_BED_ONLY', 'Bed Only')}/>, value: 'ACCOMMODATION_BED_ONLY' },
    ACCOMMODATION_BED_AND_BREAKFAST: { label: <T v={t => t('ACCOMMODATION_BED_AND_BREAKFAST', 'Bed & Breakfast')}/>, value: 'ACCOMMODATION_BED_AND_BREAKFAST' },
    ACCOMMODATION_HALF_BOARD: { label: <T v={t => t('ACCOMMODATION_HALF_BOARD', 'Half Board')}/>, value: 'ACCOMMODATION_HALF_BOARD' },
    ACCOMMODATION_FULL_BOARD: { label: <T v={t => t('ACCOMMODATION_FULL_BOARD', 'Full Board')}/>, value: 'ACCOMMODATION_FULL_BOARD' },
};
export const STATUS_TYPES = {
    TO_BOOK: { label: <T v={t => t('TO_BOOK', 'To Book')}/>, value: 'TO_BOOK' },
    BOOKED: { label: <T v={t => t('BOOKED', 'Booked')}/>, value: 'BOOKED' },
    BOOKED_DEPOSIT_PAID: { label: <T v={t => t('BOOKED_DEPOSIT_PAID', 'Booked & Deposit Paid')}/>, value: 'BOOKED_DEPOSIT_PAID' },
    BOOKED_PAID: { label: <T v={t => t('BOOKED_PAID', 'Booked & Paid')}/>, value: 'BOOKED_PAID' },
    PAID: { label: <T v={t => t('PAID', 'Paid')}/>, value: 'PAID' },
};
