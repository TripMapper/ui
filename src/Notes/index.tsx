import css from './style.module.scss';
import { cx } from '../util';
import { useState } from 'react';

export interface NotesMetadataValue {
	id: string;
	value: string;
}

export interface NotesProps {
	name?: string;
	placeholder?: string;
	defaultValue?: string | NotesMetadataValue;
	increaseSpacing?: boolean;
	asMetadata?: boolean;
	readOnly?: boolean;
}

interface ShittyTSCompStylesHack {
	borderTopWidth: any;
	borderBottomWidth: any;
}

export default function Notes ({
	name,
	placeholder,
	defaultValue,
	asMetadata = false,
	increaseSpacing = false,
	readOnly = false,
} : NotesProps) {
	const originalValue = asMetadata ? (defaultValue as NotesMetadataValue)?.value ?? '' : defaultValue as string;
	const [value, setValue] = useState(originalValue ?? '');

	const onChange = e => {
		setValue(e.target.value);
	};

	const onInput = e => {
		let { borderTopWidth, borderBottomWidth } = window.getComputedStyle(e.target) as unknown as ShittyTSCompStylesHack;
		borderTopWidth = +borderTopWidth.replace(/[^\d.]/g, '');
		borderBottomWidth = +borderBottomWidth.replace(/[^\d.]/g, '');
		e.target.style.height = '';
		e.target.style.height = (e.target.scrollHeight + borderTopWidth + borderBottomWidth) + 'px';
	};

	const subName = originalValue === '' ? 'create[rid_notes]' : 'updateById[rid_notes].patch';

	return readOnly ? (
		<div className={cx(css.notes, increaseSpacing && css.increaseSpacing)}>
			{asMetadata ? (defaultValue as NotesMetadataValue).value : (defaultValue as string)}
		</div>
	) : (
		<>
			{asMetadata && value !== '' && (
				<input type="hidden" name={`${name}.${subName}.primaryType`} value="NOTES" />
			)}
			{asMetadata && defaultValue && originalValue !== '' && (
				value === '' ? (
					<input type="hidden" name={`${name}.deleteById[rid_notes].id`} value={(defaultValue as NotesMetadataValue).id}/>
				) : (
					<input type="hidden" name={`${name}.updateById[rid_notes].id`} value={(defaultValue as NotesMetadataValue).id} />
				)
			)}
			<textarea
				name={asMetadata ? value === '' ? '' : `${name}.${subName}.value` : name}
				className={cx(css.notes, increaseSpacing && css.increaseSpacing)}
				onInput={onInput}
				onChange={onChange}
				value={value}
				placeholder={placeholder}
			/>
		</>
	);
}
