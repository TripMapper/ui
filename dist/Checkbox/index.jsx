import css from './style.module.scss';
export default function Checkbox({ name, value = '(bool)1', includeFalsyValue = false, falsyValue = '(bool)0', required = false, defaultChecked = false, label, inputRef = null, }) {
    return (<label className={css.label}>
			{includeFalsyValue && (<input type="hidden" name={name} defaultValue={falsyValue}/>)}
			<input ref={inputRef} type="checkbox" name={name} value={value} defaultChecked={defaultChecked} required={required}/>
			<span className={css.checkbox}/>
			{label && (<span className={css.label}>{label}</span>)}
		</label>);
}
