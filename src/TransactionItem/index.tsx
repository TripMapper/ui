import css from './style.module.scss';
import { gql } from 'urql';
import Image, { IMAGE_FRAGMENT } from '../Image';
import { STATUS_TYPES } from '../Consts';
import { cx, formatCurrency } from '../util';
import Icon from '../Icon';
import { ReactNode } from 'react';
import { CurrencyParts } from '../util/formatCurrency';

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
	${IMAGE_FRAGMENT}
`;

export interface TransactionItemProps {
	id: string;
	El?: ReactNode;
	name: string;
	type: string;
	status: string;
	budget: number;
	tripBudget: number;
	currency?: { iso: string };
	tripCurrency?: { iso: string };
	image?: any;
}

export default function TransactionItem ({
	El = 'div',
	name,
	type,
	status,
	image = null,
	budget,
	tripBudget,
	currency,
	tripCurrency,
} : TransactionItemProps) {
	const { symbol, integer, mantissa } = formatCurrency(tripBudget, tripCurrency.iso, false,true) as CurrencyParts;

	return (
		/*@ts-ignore*/
		<El className={cx(css.transaction, css[type.toLowerCase()])}>
			{image ? (
				<Image className={css.image} {...image.srcset} circle />
			) : (
				<span className={css.icon}>
					<Icon of="money" m />
				</span>
			)}
			<div className={css.name}>
				<strong>{name}</strong>
				<small>{status && STATUS_TYPES[status]?.label}</small>
			</div>
			<div className={css.cost}>
				<strong>{symbol}{integer}<small>.{mantissa || '00'}</small></strong>
				<small>{tripCurrency.iso !== currency.iso && formatCurrency(budget, currency.iso) as string}</small>
			</div>
		</El>
	);
}
