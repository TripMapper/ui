import css from './style.module.scss';
import {
	ReactNode,
	useEffect,
	useState
} from 'react';
import Button from '../Button';
import uuid from '../util/uuid';
import RedX from '../svg/red-x.svg';
import { nanoid } from 'nanoid';
import { cx } from '../util';

export type RepeaterField = (
	defaultRowValue : any,
	name : string,
) => ReactNode;

export interface RepeaterValue {
	id: string;
	nodeId?: string;
	[key: string]: any;
}

export interface RepeaterProps {
	name: string;
	/** @default "+ Add" */
	addLabel?: string;
	/** @default {} */
	emptyValue?: Omit<RepeaterValue, "id">;
	defaultValues?: readonly RepeaterValue[];
	max?: number;
	fields: readonly RepeaterField[];
	onBeforeAddClick?: (value: RepeaterValue) => Promise<RepeaterValue>;
	onBeforeDeleteClick?: (value: RepeaterValue) => void;
	byNodeId?: boolean;
	includeUpdateById?: boolean;
	/** @default false */
	groupFields?: boolean;
	setValues?: (values: readonly RepeaterValue[]) => void;
}

export default function Repeater ({
	name,
	addLabel = '+ Add',
	emptyValue,
	defaultValues = [],
	fields,
	max = null,
	onBeforeAddClick,
	onBeforeDeleteClick,
	byNodeId = false,
	includeUpdateById = true,
	groupFields = false,
	setValues,
} : RepeaterProps) {
	const [values, _setValues] = useState(defaultValues ?? [])
		, [deletedIds, setDeletedIds] = useState([]);

	useEffect(() => {
		if (!setValues) return;
		setValues(values);
	}, [setValues, values]);

	const onAddClick = async () => {
		let nextV = { id: 'new_' + uuid(), ...emptyValue };
		if (onBeforeAddClick) nextV = await onBeforeAddClick(nextV);

		if (!nextV) return;

		_setValues(v => ([
			...v,
			nextV,
		]));
	};

	const onDeleteClick = (index, id) => async () => {
		if (!id) {
			console.warn('Tried deleting repeater value without ID!');
			return;
		}

		if (onBeforeDeleteClick) await onBeforeDeleteClick(values[index]);

		_setValues(v => {
			const n = [...v];
			n.splice(index, 1);
			return n;
		});
		setDeletedIds(v => {
			if (id.startsWith('new_')) return v;

			const n = [...v];
			n.push(id);
			return n;
		});
	};

	return (
		<>
			{deletedIds.map(id => (
				<input
					type="hidden"
					name={byNodeId ? `${name}.deleteByNodeId[rid_${nanoid(5)}].nodeId` : `${name}.deleteById[rid_${id}].id`}
					value={id}
					key={id}
				/>
			))}
			<table className={css.repeater}>
				<tbody className={cx(groupFields && css.groupFields)}>
				{values.filter(Boolean).map((value, index) => {
					const uid = 'rid_' + nanoid(5);
					const isNew = value.id.startsWith('new_');

					const createName = `${name}.create[${uid}]`
						, updateName = `${name}.updateBy${byNodeId ? 'Node' : ''}Id[${uid}].patch`;

					return (
						<tr key={`row_${value.id}`}>
							{fields.map((field, i) => (
								<td key={`field_${value.id}_${i}`}>
									{i === 0 && !isNew && includeUpdateById && (
										<input
											type="hidden"
											name={updateName.replace('.patch', byNodeId ? '.nodeId' : '.id')}
											value={value[byNodeId ? 'nodeId' : 'id']}
										/>
									)}

									{field(value, isNew ? createName : updateName)}

									{i === fields.length - 1 && (
										<div className={css.controls}>
											<button type="button" title="Delete" onClick={onDeleteClick(index, byNodeId ? value.nodeId ?? value.id : value.id)}>
												<RedX/>
											</button>
										</div>
									)}
								</td>
							))}
						</tr>
					);
				})}
				</tbody>
				<tfoot>
				<tr>
					<td colSpan={fields.length}>
						<Button
							disabled={max && values.length >= max}
							dashed
							onClick={onAddClick}
							wide
							size="tiny"
							type="button"
						>{addLabel}</Button>
					</td>
				</tr>
				</tfoot>
			</table>
		</>
	);
}
