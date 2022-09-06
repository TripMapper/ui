import css from './style.module.scss';
import formToObj from '../util/formToObj';
import { cx } from '../util';
export default function Form({ onSubmit, children, className, ...props }) {
    const _onSubmit = async (e) => {
        e.preventDefault();
        e.persist();
        onSubmit && onSubmit(formToObj(new FormData(e.target), e.target), e);
    };
    return (<form {...props} onSubmit={_onSubmit} className={cx(css.form, className)}>
			{children}
		</form>);
}
