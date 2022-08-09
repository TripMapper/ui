import css from './style.module.scss';
import StarSVG from '../svg/star.svg';
import { ChangeEventHandler, useState } from 'react';
import { cx } from '../util';

const Star = ({ name, value, checked, onChange, readOnly = false }) => {
	if (readOnly)
		return <StarSVG className={cx(checked && css.checked)} />;

	return (
		<label className={cx(checked && css.checked)}>
			<input
				type="radio"
				name={name}
				value={`(number)${value}`}
				defaultChecked={checked}
				onChange={onChange}
			/>
			<StarSVG />
		</label>
	);
};

export interface RatingProps {
	name?: string;
	defaultValue?: number;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	readOnly?: boolean;
	small?: boolean;
}

export default function Rating ({
	name,
	defaultValue = 0,
	onChange = null,
	readOnly = false,
	small = false,
} : RatingProps) {
	const [checked, setChecked] = useState(defaultValue);
	const _onChange = e => {
		onChange && onChange(e);
		setChecked(+e.target.value.replace('(number)', ''));
	};

	return (
		<div className={cx(css.rating, small && css.small)}>
			{Array.from(
				{ length: 5 },
				(_, i) => (
					<Star
						key={i}
						name={name}
						value={5 - i}
						checked={5 - i === (readOnly ? defaultValue : checked)}
						onChange={_onChange}
						readOnly={readOnly}
					/>
				)
			)}
		</div>
	);
}
