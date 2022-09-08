import css from './style.module.scss';
import { useRef } from 'react';
import formToObj from '../util/formToObj';
import { cx } from '../util';
export default function Form({ onSubmit, children, className, ...props }) {
    const self = useRef();
    const _onSubmit = async (e) => {
        e.preventDefault();
        e.persist();
        if (e.target !== self.current) {
            process.env.NODE_ENV === 'development' && console.warn('Tried submitting from another form!', self.current, e.target);
            return;
        }
        onSubmit && onSubmit(formToObj(new FormData(e.target), e.target), e);
    };
    return (<form {...props} onSubmit={_onSubmit} className={cx(css.form, className)} ref={self}>
			{children}
		</form>);
}
