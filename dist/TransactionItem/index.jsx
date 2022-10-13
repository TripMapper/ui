import css from './style.module.scss';
import { gql } from 'urql';
import Image, { IMAGE_FRAGMENT } from '../Image';
import { STATUS_TYPES } from '../Consts';
import { cx, formatCurrency } from '../util';
import Icon from '../Icon';
export const TRANSACTION_ITEM_FRAGMENT = gql `
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
	${IMAGE_FRAGMENT}
`;
export default function TransactionItem({ El = 'div', name, type, status, image = null, budget, tripBudget, currency, tripCurrency, }) {
    const { symbol, integer, mantissa } = formatCurrency(tripBudget, tripCurrency.iso, false, true);
    return (
    /*@ts-ignore*/
    <El className={cx(css.transaction, css[type.toLowerCase()])}>
			{image ? (<Image className={css.image} {...image.srcset} circle/>) : (<span className={css.icon}>
					<Icon of="money" m/>
				</span>)}
			<div className={css.name}>
				<strong>{name}</strong>
				<small>{STATUS_TYPES[status].label}</small>
			</div>
			<div className={css.cost}>
				<strong>{symbol}{integer}<small>.{mantissa || '00'}</small></strong>
				<small>{tripCurrency.iso !== currency.iso && formatCurrency(budget, currency.iso)}</small>
			</div>
		</El>);
}
