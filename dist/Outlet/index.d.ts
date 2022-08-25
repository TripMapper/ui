/// <reference types="react" />
export interface OutletProps {
    name: string;
    notes: string;
}
export default function Outlet({ name, notes, }: OutletProps): JSX.Element;
