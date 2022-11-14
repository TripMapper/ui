import css from './style.module.scss';
import ReactSelect, { useStateManager, components, } from 'react-select';
import { useClient } from 'urql';
import SelectMenuPortal from '../SelectMenuPortal';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cx } from '../../util';
import Spinner from '../../svg/spinner.svg';
import { useAsync } from 'react-select/async';
import { useCreatable } from 'react-select/creatable';
import get from 'lodash.get';
import { useDebounce } from '../../hooks';
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
const InputComponent = required => (props) => {
    if (props.hidden)
        return <components.Input {...props}/>;
    return <components.Input {...props} required={required}/>;
};
const getDefaultFromOpts = (defaultValue, opts) => {
    if (typeof defaultValue === 'string' || typeof defaultValue === 'number' || typeof defaultValue === 'boolean')
        for (const opt of opts)
            if (opt.value === defaultValue)
                return opt;
    return defaultValue;
};
export default function Select({ name, isMulti = false, isClearable = false, isCreatable = false, options, defaultValue, placeholder, disabled = false, onChange, inline = false, query, queryVariables = {}, preloadOptions = false, queryWhenEmpty = false, pathToNodes, filterOption, required = false, merged = false, resultsParse, value, classNameOverride, }) {
    const client = useClient(), self = useRef();
    const originalValue = useMemo(() => Array.isArray(defaultValue) ? defaultValue : [defaultValue], [defaultValue]);
    const [internalValue, setInternalValue] = useState(getDefaultFromOpts(defaultValue, options ?? [])), [selected, setSelected] = useState([]), [created, setCreated] = useState([]), [removed, setRemoved] = useState([]);
    useEffect(() => {
        if (!value)
            return;
        setInternalValue(getDefaultFromOpts(value, options ?? []));
    }, [value, options]);
    const components = useMemo(() => ({
        MenuPortal: SelectMenuPortal,
        IndicatorSeparator: null,
        DropdownIndicator: () => <Spinner style={{ width: 20 }}/>,
        Input: InputComponent(required
            && (Array.isArray(internalValue) ? internalValue.length === 0 : !internalValue)),
    }), [required, internalValue]);
    // Fix outline always active after option select
    // TODO: Work out why this is an issue and actually fix it
    useEffect(() => {
        if (!self.current)
            return;
        const el = self.current;
        const onClick = e => {
            if (
            // Ensure we're not clicking on the select its children
            el.controlRef !== e.target
                && !el.controlRef.contains(e.target)
                && !e.target.contains(el.controlRef)
                // Ensure the select or its children aren't focused
                && document.activeElement !== e.target
                && !document.activeElement.contains(e.target)
                && !el.controlRef.contains(document.activeElement))
                el.controlRef.classList.remove('rsl__control--is-focused');
        };
        document.addEventListener('click', onClick);
        return () => { document.removeEventListener('click', onClick); };
    }, [self]);
    const initialProps = {
        name: isMulti ? void 0 : name,
        isMulti,
        isClearable,
        isDisabled: disabled,
        options,
        value: internalValue,
        menuPortalTarget: typeof window !== 'undefined' ? document?.body : void 0,
        components,
        className: classNameOverride ? classNameOverride : cx(css.select, inline && css.inline, merged && css.merged, name && css.named),
        classNamePrefix: 'rsl',
        placeholder,
        filterOption,
        onChange: (val, action) => {
            onChange && onChange(val, action);
            setInternalValue(val);
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
    const searchQuery = useDebounce((query, queryVariables, search, callback) => {
        client.query(query, { ...queryVariables, query: search }, { requestPolicy: 'cache-and-network' }).toPromise().then(({ data }) => {
            callback(resultsParse
                ? resultsParse(data, query)
                : get(data, pathToNodes, []));
        });
    }, 350);
    if (query) {
        delete initialProps.options;
        if (preloadOptions)
            initialProps.defaultOptions = true;
        initialProps.hideSelectedOptions = isMulti;
        initialProps.cacheOptions = true;
        initialProps.loadOptions = (search, callback) => {
            if (search.trim() === '' && !queryWhenEmpty)
                return callback([]);
            searchQuery(query, queryVariables, search, callback);
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
			<ReactSelect {...props} ref={self} isOptionDisabled={option => option.disabled}/>
		</>);
}
