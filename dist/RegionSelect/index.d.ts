/// <reference types="react" />
import { SelectProps } from '../Select/Select';
export interface RegionSelectProps extends Omit<SelectProps, 'query' | 'queryWhenEmpty' | 'preloadOptions' | 'queryVariables' | 'pathToNodes' | 'options' | 'filterOption' | 'isCreatable'> {
    countryIds?: readonly string[];
}
export default function RegionSelect({ countryIds, defaultValue, name, ...props }: RegionSelectProps): JSX.Element;
