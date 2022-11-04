import css from './style.module.scss';
import ReactSelect, {
	ActionMeta,
	InputProps,
	useStateManager,
	components,
} from 'react-select';
import { TypedDocumentNode, useClient } from 'urql';
import SelectMenuPortal from '../SelectMenuPortal';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { cx } from '../../util';
import Spinner from '../../svg/spinner.svg';
import { useAsync } from 'react-select/async';
import { useCreatable } from 'react-select/creatable';
import get from 'lodash.get';
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';
import { useDebounce } from '../../hooks';

export interface SelectOption {
	label: string | ReactNode;
	value: string | number | boolean;
	disabled?: boolean;
}

export interface SelectProps {
	name: string;
	/** @default false */
	isMulti?: boolean;
	/** @default false */
	isClearable?: boolean;
	/** @default false */
	isCreatable?: boolean;
	options?: ReadonlyArray<SelectOption>;
	defaultValue?: SelectOption | string | number | boolean;
	placeholder?: ReactNode;
	/** @default false */
	disabled?: boolean;
	onChange?: (option: ReadonlyArray<SelectOption> | SelectOption | null, actionMeta: ActionMeta<SelectOption>) => void;
	/** @default false */
	inline?: boolean;
	query?: TypedDocumentNode;
	queryVariables?: { [key: string]: any };
	/** @default false */
	preloadOptions?: boolean;
	pathToNodes?: string;
	/** @default false */
	queryWhenEmpty?: boolean;
	filterOption?: ((option: FilterOptionOption<SelectOption>, inputValue: string) => boolean) | null;
	required?: boolean;
	merged?: boolean;
	resultsParse?: (data: Object, query: string) => ReadonlyArray<SelectOption>;
}

const add = value => v => {
	const n = [...v];
	n.push(value);
	return n;
};

const remove = value => v => {
	const n = [...v];
	const i = n.indexOf(value);
	if (i > -1) n.splice(n.indexOf(value), 1);
	return n;
};

const InputComponent = required => (props : InputProps<SelectOption, true>) => {
	if (props.hidden)
		return <components.Input {...props} />;

	return <components.Input {...props} required={required} />;
};

const getDefaultFromOpts = (defaultValue, opts) : SelectOption => {
	if (typeof defaultValue === 'string' || typeof defaultValue === 'number' || typeof defaultValue === 'boolean')
		for (const opt of opts)
			if (opt.value === defaultValue)
				return opt;

	return defaultValue;
}

export default function Select ({
	name,
	isMulti = false,
	isClearable = false,
	isCreatable = false,
	options,
	defaultValue,
	placeholder,
	disabled = false,
	onChange,
	inline = false,
	query,
	queryVariables = {},
	preloadOptions = false,
	queryWhenEmpty = false,
	pathToNodes,
	filterOption,
	required = false,
	merged = false,
	resultsParse,
} : SelectProps) {
	const client = useClient()
		, self = useRef();

	const originalValue = useMemo(
		() => Array.isArray(defaultValue) ? defaultValue : [defaultValue],
		[defaultValue]
	);

	const [value, setValue] = useState(getDefaultFromOpts(defaultValue, options))
		, [selected, setSelected] = useState([])
		, [created, setCreated] = useState([])
		, [removed, setRemoved] = useState([]);

	const components = useMemo(() => ({
		MenuPortal: SelectMenuPortal,
		IndicatorSeparator: null,
		DropdownIndicator: () => <Spinner style={{width:20}} />,
		Input: InputComponent(
			required
			&& (Array.isArray(value) ? value.length === 0 : !value)
		),
	}), [required, value]);

	// Fix outline always active after option select
	// TODO: Work out why this is an issue and actually fix it
	useEffect(() => {
		if (!self.current) return;
		const el = self.current as any;

		const onClick = e => {
			if (
				// Ensure we're not clicking on the select its children
				el.controlRef !== e.target
				&& !el.controlRef.contains(e.target)
				&& !e.target.contains(el.controlRef)

				// Ensure the select or its children aren't focused
				&& document.activeElement !== e.target
				&& !document.activeElement.contains(e.target)
				&& !el.controlRef.contains(document.activeElement)
			) el.controlRef.classList.remove('rsl__control--is-focused');
		};

		document.addEventListener('click', onClick);

		return () => { document.removeEventListener('click', onClick) };
	}, [self]);

	const initialProps : any = {
		name: isMulti ? void 0 : name,
		isMulti,
		isClearable,
		isDisabled: disabled,
		options,
		value,
		menuPortalTarget: typeof window !== 'undefined' ? document?.body : void 0,
		components,
		className: cx(
			css.select,
			inline && css.inline,
			merged && css.merged,
			name   && css.named,
		),
		classNamePrefix: 'rsl',
		placeholder,
		filterOption,
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

	const searchQuery = useDebounce((query, queryVariables, search, callback) => {
		client.query(
			query,
			{ ...queryVariables, query: search },
			{ requestPolicy: 'cache-and-network' },
		).toPromise().then(({ data }) => {
			callback(
				resultsParse
					? resultsParse(data, query)
					: get(data, pathToNodes, [])
			);
		});
	}, 350);

	if (query) {
		delete initialProps.options;

		if (preloadOptions) initialProps.defaultOptions = true;
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
		if (!stateManagerProps) stateManagerProps = useStateManager(initialProps);
		creatableProps = useCreatable(stateManagerProps);
	}

	const props = creatableProps ?? stateManagerProps ?? initialProps;

	return (
		<>
			{isMulti && (
				<>
					{created.map(v => (
						<input type="hidden" name={`${name}.created[]`} value={v.value} key={v.value} />
					))}
					{selected.map(v => (
						<input type="hidden" name={`${name}.selected[]`} value={v.value} key={v.value} />
					))}
					{removed.map(v => (
						<input type="hidden" name={`${name}.removed[]`} value={v.value} key={v.value} />
					))}
				</>
			)}
			<ReactSelect
				{...props}
				ref={self}
				isOptionDisabled={option => (option as SelectOption).disabled}
			/>
		</>
	);
}
