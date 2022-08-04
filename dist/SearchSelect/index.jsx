import css from './style.module.scss';
import cssSelect from '../Select/Select/style.module.scss';
import cssPortal from '../Select/SelectMenuPortal/style.module.scss';
import ReactSelect from 'react-select/async';
import { cx } from '../util';
import { components } from 'react-select';
import { useMemo, useState } from 'react';
import { useClient } from 'urql';
import get from 'lodash.get';
const Menu = props => <components.Menu {...props} className={cx(cssPortal.menu, css.menu)}/>;
const Input = props => <components.Input {...props} isHidden={false}/>;
const Option = (childRenderer = (d, c) => c) => ({ innerProps, children, isFocused, isSelected, data }) => (<div {...innerProps} className={cx(css.item, isFocused && css.focused, isSelected && css.selected)}>
		{childRenderer(data, children)}
	</div>);
// TODO: pass IDs to exclude
export default function SearchSelect({ placeholder, pathToNodes, onSelect, query, itemRenderer, excludeIds = [], }) {
    const client = useClient();
    const [inputValue, setInputValue] = useState(''), [cachedOpts, setCachedOpts] = useState([]);
    const search = async (search) => {
        if (search.trim() === '') {
            setCachedOpts([]);
            return [];
        }
        const { data } = await client.query(query, { query: search, excludeIds }, { requestPolicy: 'cache-and-network' }).toPromise();
        const opts = get(data, pathToNodes, []);
        setCachedOpts(opts);
        return opts;
    };
    const onInputChange = (inputValue, { action }) => {
        if (action === 'input-change')
            setInputValue(inputValue);
    };
    const _onSelect = value => {
        onSelect(value);
    };
    const OptEl = useMemo(() => Option(itemRenderer), [itemRenderer]);
    return (<ReactSelect defaultOptions={cachedOpts} placeholder={placeholder ?? 'Search...'} cacheOptions loadOptions={search} menuIsOpen escapeClearsValue={false} backspaceRemovesValue={false} controlShouldRenderValue={false} hideSelectedOptions={false} closeMenuOnSelect={false} closeMenuOnScroll={false} blurInputOnSelect={false} maxMenuHeight={null} isClearable={false} onInputChange={onInputChange} inputValue={inputValue} components={{
            Menu,
            Input,
            Option: OptEl,
            IndicatorSeparator: null,
            DropdownIndicator: null,
        }} className={cx(cssSelect.select)} classNamePrefix="rsl" noOptionsMessage={() => null} onChange={_onSelect}/>);
}
