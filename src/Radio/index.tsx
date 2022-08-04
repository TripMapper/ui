import css from './style.module.scss';

export default function Radio ({
	name,
	prefix = '',
	suffix = '',
	value = '1',
	defaultChecked = false,
}) {
	return (
		<label className={css.radio}>
			<input
				type="radio"
				name={name}
				value={value}
				defaultChecked={defaultChecked}
			/>
			{prefix && <span className={css.prefix}>{prefix}</span>}
			<span className={css.input} />
			{suffix && <span className={css.suffix}>{suffix}</span>}
		</label>
	);
}
