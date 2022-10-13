import css from './style.module.scss';
import { gql } from 'urql';
import Image from '../Image';
import { STATUS_TYPES } from '../Consts';
import { cx } from '../util';

export const TRANSACTION_ITEM_FRAGMENT = gql`
	fragment TransactionItem on Card {
		id
		name
		type
		subType
		status
		budget
		deposit
		tripBudget
		tripDeposit
		currency { id iso }
		image {
			id
			srcset (
				width: 40
				height: 40
			) {
				...Image
			}
        }
	}
`;

export default function TransactionItem ({
	name,
	type,
	status,
	image = null,
}) {
	return (
		<div className={cx(css.transaction, css[type.toLowerCase()])}>
			{image ? (
				<Image {...image.srcset} circle />
			) : (
				<span className={css.icon}>
					hi
				</span>
			)}
			<div className={css.name}>
				<strong>{name}</strong>
				<small>{STATUS_TYPES[status].label}</small>
			</div>
		</div>
	);
}
