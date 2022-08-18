/// <reference types="react" />
import { Icons } from '../Types';
export interface IconProps {
    of: Icons;
    xs?: boolean;
    s?: boolean;
    /**
     * Automatically overridden by other style options
     * @default true
     **/
    m?: boolean;
    l?: boolean;
    xl?: boolean;
}
export default function Icon({ of, xs, s, m, l, xl, }: IconProps): JSX.Element;
