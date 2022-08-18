/// <reference types="react" />
import { Flags } from '../Types';
export interface FlagProps {
    iso: Flags;
    small?: boolean;
    medium?: boolean;
    large?: boolean;
}
export default function Flag({ iso, small, medium, large, }: FlagProps): JSX.Element;
