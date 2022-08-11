/// <reference types="react" />
import { SelectProps } from '../Select/Select';
export interface CountrySelectProps extends Omit<SelectProps, 'query' | 'queryWhenEmpty' | 'preloadOptions' | 'queryVariables' | 'pathToNodes' | 'options' | 'filterOption' | 'isCreatable'> {
    defaultValueIso?: string;
}
export default function CountrySelect({ name, defaultValue, defaultValueIso, ...props }: CountrySelectProps): JSX.Element;
