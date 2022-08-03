import css from './style.module.scss';
import { ReactNode } from 'react';
import get from 'lodash.get';
import { empty } from '../util';

export interface TableData {
	id: string;
	[key: string]: any;
}

export interface TableColumn {
	label: string;
	handle: string;
	renderer?: (any, TableData) => ReactNode;
}

export interface TableProps {
	columns: readonly TableColumn[];
	data: readonly TableData[];
}

export default function Table ({ columns, data } : TableProps) {
	return (
		<table className={css.table}>
			<thead>
			<tr>
				{columns.map(col => (
					<th key={col.handle}>
						{col.label}
					</th>
				))}
			</tr>
			</thead>
			<tbody>
			{data.map(row => (
				<tr key={row.id}>
					{columns.map(col => {
						const value = get(row, col.handle);

						return (
							<td key={col.handle}>
								{col.renderer
									? col.renderer(value, row)
									: empty(value)
										? '-'
										:  String(value)}
							</td>
						);
					})}
				</tr>
			))}
			</tbody>
		</table>
	);
}
