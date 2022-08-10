import css from './style.module.scss';
import cssSelect from '../Select/Select/style.module.scss';
import cssPortal from '../Select/SelectMenuPortal/style.module.scss';
import ReactSelect from 'react-select/async';
import { cx } from '../util';
import { components } from 'react-select';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import { SelectOption } from '../Select/Select';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { useClient } from 'urql';
import get from 'lodash.get';
import debounce from 'lodash.debounce';

interface SelectOptionWithData extends SelectOption {
	[key: string]: any;
}

export interface SearchSelectProps {
	placeholder?: string;
	query: TypedDocumentNode,
	pathToNodes: string;
	onSelect: (option: SelectOptionWithData) => void;
	itemRenderer?: (data: SelectOptionWithData, children: ReactNode) => ReactNode;
	excludeIds: readonly string[];
}

const Menu = props => <components.Menu {...props} className={cx(cssPortal.menu, css.menu)} />;
const Input = props => <components.Input {...props} isHidden={false} />;
const Option = (childRenderer = (d, c) => c) => ({ innerProps, children, isFocused, isSelected, data }) => (
	<div
		{...innerProps}
		className={cx(
			css.item,
			isFocused && css.focused,
			isSelected && css.selected,
		)}
	>
		{childRenderer(data, children)}
	</div>
);

export default function SearchSelect ({
	placeholder,
	pathToNodes,
	onSelect,
	query,
	itemRenderer,
	excludeIds = [],
} : SearchSelectProps) {
	const client = useClient();
	const [inputValue, setInputValue] = useState('')
		, [cachedOpts, setCachedOpts] = useState([]);

	const searchQuery = useCallback(
		debounce(
			(query, excludeIds, search, callback) => client.query(
				query,
				{ query: search, excludeIds },
				{ requestPolicy: 'cache-and-network' }
			).toPromise().then(({ data }) => {
				const opts = get(data, pathToNodes, []);
				setCachedOpts(opts);
				callback(opts);
			}),
			350
		),
		[]
	);

	const search = (search, callback) => {
		if (search.trim() === '') {
			setCachedOpts([]);
			return callback([]);
		}

		searchQuery(query, excludeIds, search, callback);
	};

	const onInputChange = (inputValue, { action }) => {
		if (action === 'input-change') setInputValue(inputValue);
	};

	const _onSelect = value => {
		onSelect(value);
	};

	const OptEl = useMemo(() => Option(itemRenderer), [itemRenderer]);

	return (
		<ReactSelect
			defaultOptions={cachedOpts}
			placeholder={placeholder ?? 'Search...'}
			cacheOptions
			loadOptions={search}
			menuIsOpen
			escapeClearsValue={false}
			backspaceRemovesValue={false}
			controlShouldRenderValue={false}
			hideSelectedOptions={false}
			closeMenuOnSelect={false}
			closeMenuOnScroll={false}
			blurInputOnSelect={false}
			maxMenuHeight={null}
			isClearable={false}
			onInputChange={onInputChange}
			inputValue={inputValue}
			components={{
				Menu,
				Input,
				Option: OptEl,
				IndicatorSeparator: null,
				DropdownIndicator: null,
			}}
			className={cx(cssSelect.select)}
			classNamePrefix="rsl"
			noOptionsMessage={() => null}
			onChange={_onSelect}
		/>
	);
}
