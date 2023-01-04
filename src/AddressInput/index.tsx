import css from './style.module.scss';
import Input from '../Input';
import CountrySelect from '../CountrySelect';
import { useTranslation } from 'react-i18next';

export interface Address {
	address1?: string;
	address2?: string;
	address3?: string;
	city?: string;
	state?: string;
	zip?: string;
	countryId?: string;
}

export interface AddressInputProps {
	name: string,
	required?: boolean,
	defaultValue?: Address,
}

export default function AddressInput ({ name, required, defaultValue } : AddressInputProps) {
	const { t } = useTranslation();
	const n = n => name ? `${name}[${n}]` : n;

	return (
		<fieldset className={css.addressInput}>
			<Input
				placeholder={
					required
						? t('address1Required', 'Address Line 1 *')
						: t('address1', 'Address Line 1')
				}
				name={n('address1')}
				required={required}
				defaultValue={defaultValue?.address1}
			/>
			<Input
				placeholder={t('address2', 'Address Line 2')}
				name={n('address2')}
				defaultValue={defaultValue?.address2}
			/>
			<Input
				placeholder={t('address3', 'Address Line 3')}
				name={n('address3')}
				defaultValue={defaultValue?.address3}
			/>
			<div>
				<Input
					placeholder={t('city', 'Town/City')}
					name={n('city')}
					defaultValue={defaultValue?.city}
				/>
				<Input
					placeholder={t('state', 'County/State')}
					name={n('state')}
					defaultValue={defaultValue?.state}
				/>
			</div>
			<div>
				<Input
					placeholder={t('zip', 'Zip/Postal Code')}
					name={n('zip')}
					defaultValue={defaultValue?.zip}
				/>
				<CountrySelect
					placeholder={
						required
							? t('countryRequired', 'Country *')
							: t('country', 'Country')
					}
					name={n('countryId')}
					required={required}
					defaultValue={defaultValue?.countryId}
				/>
			</div>
		</fieldset>
	);
}
