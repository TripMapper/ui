import css from './style.module.scss';
import get from 'lodash.get';
import { cx, empty } from '../util';
export default function Table({ columns, data, inline = false, ...props }) {
    const tbl = (<table className={css.table} {...props}>
			<thead>
			<tr>
				{columns.map(col => (<th key={col.handle} style={{ width: col.width }}>
						{col.label}
					</th>))}
			</tr>
			</thead>
			<tbody>
			{data.map(row => (<tr key={row.id}>
					{columns.map(col => {
                const value = get(row, col.handle);
                return (<td key={col.handle} className={cx(css[col.align])}>
								{col.renderer
                        ? col.renderer(value, row)
                        : empty(value)
                            ? '-'
                            : String(value)}
							</td>);
            })}
				</tr>))}
			</tbody>
		</table>);
    return inline ? <div className={css.inline}>{tbl}</div> : tbl;
}
