import css from './style.module.scss';
import ReactSelect from 'react-select';
import SelectMenuPortal from '../SelectMenuPortal';
import { cx } from '../../util';
import Spinner from '../../svg/spinner.svg';
export default function Select({ name, isMulti, isClearable, options, defaultValue, query, placeholder, onChange, inline = false, }) {
    return (<ReactSelect name={name} isMulti={isMulti} isClearable={isClearable} options={options} defaultValue={defaultValue} menuPortalTarget={typeof window !== 'undefined' ? document?.body : void 0} components={{
            MenuPortal: SelectMenuPortal,
            IndicatorSeparator: null,
            DropdownIndicator: () => <Spinner style={{ width: 20 }}/>,
        }} className={cx(css.select, inline && css.inline)} classNamePrefix="rsl" placeholder={placeholder} onChange={onChange}/>);
}
