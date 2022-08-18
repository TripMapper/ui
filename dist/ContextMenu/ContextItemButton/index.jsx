import css from './style.module.scss';
import cx from '../../util/cx';
import Icon from '../../Icon';
export default function ContextItemButton({ type, text, onClick, icon }) {
    return (<button type="button" onClick={onClick} className={cx(css.btn, type === 'danger' && css.danger)}>
			{icon && <Icon of={icon} l/>}
			{text}
		</button>);
}
