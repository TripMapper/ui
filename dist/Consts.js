import { t } from 'i18next';
export const PRIMARY_TYPES = {
    TRAVEL: { label: t('TRAVEL', 'Travel'), value: 'TRAVEL' },
    ACTIVITY: { label: t('ACTIVITY', 'Activity'), value: 'ACTIVITY' },
    ACCOMMODATION: { label: t('ACCOMMODATION', 'Accommodation'), value: 'ACCOMMODATION' },
    FOOD: { label: t('FOOD', 'Food'), value: 'FOOD' },
    OTHER: { label: t('OTHER', 'Other'), value: 'OTHER' },
};
export const TRAVEL_TYPES = {
    TRAVEL_FLIGHT: { label: t('TRAVEL_FLIGHT', 'Flight'), value: 'TRAVEL_FLIGHT' },
    TRAVEL_DRIVE: { label: t('TRAVEL_DRIVE', 'Drive'), value: 'TRAVEL_DRIVE' },
    TRAVEL_TAXI: { label: t('TRAVEL_TAXI', 'Taxi'), value: 'TRAVEL_TAXI' },
    TRAVEL_BOAT: { label: t('TRAVEL_BOAT', 'Boat'), value: 'TRAVEL_BOAT' },
    TRAVEL_PUBLIC_TRANSPORT: { label: t('TRAVEL_PUBLIC_TRANSPORT', 'Public Transport'), value: 'TRAVEL_PUBLIC_TRANSPORT' },
    TRAVEL_CYCLE: { label: t('TRAVEL_CYCLE', 'Cycle'), value: 'TRAVEL_CYCLE' },
    TRAVEL_WALK: { label: t('TRAVEL_WALK', 'Walk'), value: 'TRAVEL_WALK' },
};
export const STATUS_TYPES = {
    TO_BOOK: { label: t('TO_BOOK', 'To Book'), value: 'TO_BOOK' },
    BOOKED: { label: t('BOOKED', 'Booked'), value: 'BOOKED' },
    BOOKED_DEPOSIT_PAID: { label: t('BOOKED_DEPOSIT_PAID', 'Booked & Deposit Paid'), value: 'BOOKED_DEPOSIT_PAID' },
    BOOKED_PAID: { label: t('BOOKED_PAID', 'Booked & Paid'), value: 'BOOKED_PAID' },
    PAID: { label: t('PAID', 'Paid'), value: 'PAID' },
};
