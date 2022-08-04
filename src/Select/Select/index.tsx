import css from './style.module.scss';
import ReactSelect, { ActionMeta, useStateManager } from 'react-select';
import { TypedDocumentNode, useClient } from 'urql';
import SelectMenuPortal from '../SelectMenuPortal';
import { ReactNode } from 'react';
import { cx } from '../../util';
import Spinner from '../../svg/spinner.svg';
import { useAsync } from 'react-select/async';
import { useCreatable } from 'react-select/creatable';
import get from 'lodash.get';

export interface SelectOption {
	label: string;
	value: string | number | boolean;
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
	defaultValue?: SelectOption;
	placeholder?: ReactNode;
	onChange?: (option: ReadonlyArray<SelectOption> | SelectOption | null, actionMeta: ActionMeta<SelectOption>) => void;
	/** @default false */
	inline?: boolean;
	query?: TypedDocumentNode;
	/** @default false */
	preloadOptions?: boolean;
	pathToNodes?: string;
	/** @default false */
	queryWhenEmpty?: boolean;
}

export default function Select ({
	name,
	isMulti = false,
	isClearable = false,
	isCreatable = false,
	options,
	defaultValue,
	placeholder,
	onChange,
	inline = false,
	query,
	preloadOptions = false,
	pathToNodes,
	queryWhenEmpty = false,
} : SelectProps) {
	const client = useClient();

	const initialProps : any = {
		name,
		isMulti,
		isClearable,
		options,
		defaultValue,
		menuPortalTarget: typeof window !== 'undefined' ? document?.body : void 0,
		components: {
			MenuPortal: SelectMenuPortal,
			IndicatorSeparator: null,
			DropdownIndicator: () => <Spinner style={{width:20}} />,
		},
		className: cx(css.select, inline && css.inline),
		classNamePrefix: 'rsl',
		placeholder,
		onChange,
	};

	let asyncProps, stateManagerProps, creatableProps;

	if (query) {
		delete initialProps.options;

		if (preloadOptions) initialProps.defaultOptions = true;
		initialProps.hideSelectedOptions = true;
		initialProps.cacheOptions = true;
		initialProps.loadOptions = async search => {
			if (search.trim() === '' && !queryWhenEmpty)
				return [];

			const { data } = await client.query(
				query,
				{ query: search },
				{ requestPolicy: 'cache-and-network' },
			).toPromise();

			return get(data, pathToNodes, []);
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
		<ReactSelect
			{...props}
		/>
	);
}
