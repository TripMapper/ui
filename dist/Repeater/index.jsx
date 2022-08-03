import css from './style.module.scss';
import { useState } from 'react';
import Button from '../Button';
import uuid from '../util/uuid';
import RedX from '../svg/red-x.svg';
import { nanoid } from 'nanoid';
export default function Repeater({ name, addLabel = '+ Add', emptyValue, defaultValues = [], fields, max = null, onBeforeAddClick, deleteByNodeId = false, includeUpdateById = true, }) {
    const [values, setValues] = useState(defaultValues ?? []), [deletedIds, setDeletedIds] = useState([]);
    const onAddClick = async () => {
        let nextV = { id: 'new_' + uuid(), ...emptyValue };
        if (onBeforeAddClick)
            nextV = await onBeforeAddClick(nextV);
        if (!nextV)
            return;
        setValues(v => ([
            ...v,
            nextV,
        ]));
    };
    const onDeleteClick = (index, id) => () => {
        setValues(v => {
            const n = [...v];
            n.splice(index, 1);
            return n;
        });
        setDeletedIds(v => {
            if (id.startsWith('new_'))
                return v;
            const n = [...v];
            n.push(id);
            return n;
        });
    };
    return (<>
			{deletedIds.map(id => (<input type="hidden" name={deleteByNodeId ? `${name}.deleteByNodeId[rid_${nanoid(5)}].nodeId` : `${name}.deleteById[rid_${id}].id`} value={id} key={id}/>))}
			<table className={css.repeater}>
				<tbody>
				{values.map((value, index) => {
            const uid = 'rid_' + nanoid(5);
            const isNew = value.id.startsWith('new_');
            const createName = `${name}.create[${uid}]`, updateName = `${name}.updateById[${uid}].patch`;
            return (<tr key={`row_${value.id}`}>
							{fields.map((field, i) => (<td key={`field_${value.id}_${i}`}>
									{i === 0 && !isNew && includeUpdateById && (<input type="hidden" name={updateName.replace('.patch', '.id')} value={value.id}/>)}

									{field(value, isNew ? createName : updateName)}

									{i === fields.length - 1 && (<div className={css.controls}>
											<button type="button" title="Delete" onClick={onDeleteClick(index, deleteByNodeId ? value.nodeId : value.id)}>
												<RedX />
											</button>
										</div>)}
								</td>))}
						</tr>);
        })}
				</tbody>
				<tfoot>
				<tr>
					<td colSpan={fields.length}>
						<Button disabled={max && values.length >= max} dashed onClick={onAddClick} wide size="tiny" type="button">{addLabel}</Button>
					</td>
				</tr>
				</tfoot>
			</table>
		</>);
}
