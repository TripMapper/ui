import css from './style.module.scss';
import { gql } from 'urql';
import Image, { IMAGE_FRAGMENT } from '../Image';
import { cx } from '../util';
import RedX from '../svg/red-x.svg';

export const SUPPLIER_CARD_FRAGMENT = gql`
	fragment SupplierCard on Supplier {
		name
		email: metadataList (
			condition: { primaryType: EMAIL }
			first: 1
		) {
			value
		}
		rating
		logo {
			srcset (
				width: 48
				height: 48
			) {
				...Image
			}
        }
	}
	${IMAGE_FRAGMENT}
`;

const Rating = ({ int }) => (
	<>
		{Array.from({ length: 5 }, (_, i) => (
			<i key={i} className={cx(css.rating, int > i && css.on)} />
		))}
	</>
)

export default function SupplierCard ({ logo, name, email, rating, paid, onPaidClick, onRemoveClick }) {
	return (
		<div className={css.supplierCard}>
			{(logo ?? []).length > 0 ? (
				<Image {...logo[0].srcset} circle className={css.img} />
			) : (<span className={css.imgPlaceholder} />)}
			<div>
				<strong>{name} {rating > 0 && <Rating int={rating} />}</strong>
				<span>{email?.[0]?.value}</span>
			</div>
			{onPaidClick && (
				<button
					type="button"
					className={cx(css.paid, paid && css.isPaid)}
					onClick={onPaidClick}
				>
					{paid ? 'Paid' : 'Unpaid'}
				</button>
			)}
			{onRemoveClick && (
				<button
					type="button"
					onClick={onRemoveClick}
					title="Remove Supplier"
					className={css.remove}
				>
					<RedX />
				</button>
			)}
		</div>
	);
}
