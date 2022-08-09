import css from './style.module.scss';
import ReactSelect, { useStateManager } from 'react-select';
import { useClient } from 'urql';
import SelectMenuPortal from '../SelectMenuPortal';
import { useMemo, useState } from 'react';
import { cx } from '../../util';
import Spinner from '../../svg/spinner.svg';
import { useAsync } from 'react-select/async';
import { useCreatable } from 'react-select/creatable';
import get from 'lodash.get';
const add = value => v => {
    const n = [...v];
    n.push(value);
    return n;
};
const remove = value => v => {
    const n = [...v];
    const i = n.indexOf(value);
    if (i > -1)
        n.splice(n.indexOf(value), 1);
    return n;
};
export default function Select({ name, isMulti = false, isClearable = false, isCreatable = false, options, defaultValue, placeholder, disabled = false, onChange, inline = false, query, queryVariables = {}, preloadOptions = false, pathToNodes, queryWhenEmpty = false, }) {
    const client = useClient();
    const originalValue = useMemo(() => Array.isArray(defaultValue) ? defaultValue : [defaultValue], [defaultValue]);
    const [value, setValue] = useState(defaultValue), [selected, setSelected] = useState([]), [created, setCreated] = useState([]), [removed, setRemoved] = useState([]);
    const initialProps = {
        name: isMulti ? void 0 : name,
        isMulti,
        isClearable,
        isDisabled: disabled,
        options,
        value,
        menuPortalTarget: typeof window !== 'undefined' ? document?.body : void 0,
        components: {
            MenuPortal: SelectMenuPortal,
            IndicatorSeparator: null,
            DropdownIndicator: () => <Spinner style={{ width: 20 }}/>,
        },
        className: cx(css.select, inline && css.inline),
        classNamePrefix: 'rsl',
        placeholder,
        onChange: (val, action) => {
            onChange && onChange(val, action);
            setValue(val);
            if (!isMulti)
                return;
            switch (action.action) {
                case 'select-option':
                    setSelected(add(action.option));
                    setRemoved(remove(action.option));
                    break;
                case 'create-option':
                    setCreated(add(action.option));
                    break;
                case 'remove-value':
                    if (created.indexOf(action.removedValue) > -1)
                        setCreated(remove(action.removedValue));
                    if (originalValue.indexOf(action.removedValue) > -1)
                        setRemoved(add(action.removedValue));
                    break;
            }
        },
    };
    let asyncProps, stateManagerProps, creatableProps;
    if (query) {
        delete initialProps.options;
        if (preloadOptions)
            initialProps.defaultOptions = true;
        initialProps.hideSelectedOptions = isMulti;
        initialProps.cacheOptions = true;
        initialProps.loadOptions = async (search) => {
            if (search.trim() === '' && !queryWhenEmpty)
                return [];
            const { data } = await client.query(query, { ...queryVariables, query: search }, { requestPolicy: 'cache-and-network' }).toPromise();
            return get(data, pathToNodes, []);
        };
        asyncProps = useAsync(initialProps);
        stateManagerProps = useStateManager(asyncProps);
    }
    if (isCreatable) {
        if (!stateManagerProps)
            stateManagerProps = useStateManager(initialProps);
        creatableProps = useCreatable(stateManagerProps);
    }
    const props = creatableProps ?? stateManagerProps ?? initialProps;
    return (<>
			{isMulti && (<>
					{created.map(v => (<input type="hidden" name={`${name}.created[]`} value={v.value} key={v.value}/>))}
					{selected.map(v => (<input type="hidden" name={`${name}.selected[]`} value={v.value} key={v.value}/>))}
					{removed.map(v => (<input type="hidden" name={`${name}.removed[]`} value={v.value} key={v.value}/>))}
				</>)}
			<ReactSelect {...props}/>
		</>);
}
