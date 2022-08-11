/// <reference types="react" />
export interface FlagProps {
    iso: string;
    small?: boolean;
    medium?: boolean;
    large?: boolean;
}
export default function Flag({ iso, small, medium, large, }: FlagProps): JSX.Element;
