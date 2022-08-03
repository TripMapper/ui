import css from './style.module.scss';
import cx from '../../util/cx';
export default function ContextItemButton({ type, text, onClick }) {
    return (<button type="button" onClick={onClick} className={cx(css.btn, type === 'danger' && css.danger)}>
			{text}
		</button>);
}
