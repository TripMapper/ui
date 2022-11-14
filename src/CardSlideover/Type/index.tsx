import { cx } from '../../util';
import css from './style.module.scss';
import { PRIMARY_TYPES } from '../../Consts';
import { gql, useMutation } from 'urql';
import Select from '../../Select';
import { Emit, Signal } from '../../util/signals';
import { useTranslation } from 'react-i18next';

export const CARD_SLIDEOVER_TYPE_FRAGMENT = gql`
	fragment CardSlideoverType on Card {
		id
		type
	}
`;

export default function Type ({ id, type, readOnly = false }) {
	const { t } = useTranslation();

	const [, save] = useMutation(gql`
		mutation SaveCardType (
			$id: UUID!
			$type: CardType!
		) {
			updateCard (input: {
				id: $id
				patch: { type: $type }
			}) {
				card {
					id
					type
                }
			}
		}
	`);

	const onChange = async ({ value }) => {
		const { error } = await save({
			id,
			type: value,
		});

		if (error) Emit(
			Signal.Notify,
			t('save_failed', 'Failed to Save'),
			'error',
			t('card_type_save_failed', 'Unable to save card type'),
		);
	};

	return readOnly ? (
		<div className={cx(css.type, css[type.toLowerCase()])}>
			<h4>{PRIMARY_TYPES[type].label}</h4>
		</div>
	) : (
		<label className={cx(css.type, css.label, css[type.toLowerCase()])}>
			<Select
				name=""
				options={Object.values(PRIMARY_TYPES)}
				defaultValue={PRIMARY_TYPES[type]}
				classNameOverride={css.select}
				/*@ts-ignore*/
				onChange={onChange}
			/>
		</label>
	);
}
