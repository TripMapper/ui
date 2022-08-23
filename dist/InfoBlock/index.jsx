import css from './style.module.scss';
import Icon from '../Icon';
import { useState } from 'react';
import Slideover from '../Slideover';
const WHITESPACE = <>&nbsp;</>;
export default function InfoBlock({ icon, primary, secondary, count, label, children, }) {
    const [open, setOpen] = useState(false);
    const onClick = () => setOpen(true), onRequestClose = () => setOpen(false);
    return (<>
			<button type="button" className={css.infoBlock} onClick={onClick}>
				<div>
					{count && <span className={css.count}>{count}</span>}
					<Icon of={icon} xl/>
					<span className={css.primary} title={primary}>{primary || WHITESPACE}</span>
					<small className={css.secondary} title={secondary}>{secondary || WHITESPACE}</small>
				</div>
				<small className={css.label}>{label}</small>
			</button>
			{children && (<Slideover isOpen={open} onRequestClose={onRequestClose} heading={label}>
					{children}
				</Slideover>)}
		</>);
}
