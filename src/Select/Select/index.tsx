import css from './style.module.scss';
import ReactSelect, { ActionMeta } from 'react-select';
import { TypedDocumentNode } from 'urql';
import SelectMenuPortal from '../SelectMenuPortal';
import { ReactNode } from 'react';
import { cx } from '../../util';
import Spinner from '../../svg/spinner.svg';

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
	options?: ReadonlyArray<SelectOption>;
	defaultValue?: SelectOption;
	query?: TypedDocumentNode;
	placeholder?: ReactNode;
	onChange?: (option: ReadonlyArray<SelectOption> | SelectOption | null, actionMeta: ActionMeta<SelectOption>) => void;
	/** @default false */
	inline?: boolean;
}

export default function Select ({
	name,
	isMulti,
	isClearable,
	options,
	defaultValue,
	query,
	placeholder,
	onChange,
	inline = false,
} : SelectProps) {
	return (
		<ReactSelect
			name={name}
			isMulti={isMulti}
			isClearable={isClearable}
			options={options}
			defaultValue={defaultValue}
			menuPortalTarget={typeof window !== 'undefined' ? document?.body : void 0}
			components={{
				MenuPortal: SelectMenuPortal,
				IndicatorSeparator: null,
				DropdownIndicator: () => <Spinner style={{width:20}} />,
			}}
			className={cx(css.select, inline && css.inline)}
			classNamePrefix="rsl"
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
}
