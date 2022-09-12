import css from './style.module.scss';
import { forwardRef, useCallback } from 'react';
import { cx } from '../util';
const TextArea = forwardRef(({ className, onInput, rows = 4, ...props }, ref) => {
    const _onInput = useCallback(e => {
        e.persist();
        let { borderTopWidth, borderBottomWidth } = window.getComputedStyle(e.target);
        borderTopWidth = +borderTopWidth.replace(/[^\d.]/g, '');
        borderBottomWidth = +borderBottomWidth.replace(/[^\d.]/g, '');
        e.target.style.height = '';
        e.target.style.height = (e.target.scrollHeight + borderTopWidth + borderBottomWidth) + 'px';
        onInput?.(e);
    }, [onInput]);
    return (<textarea {...props} onInput={_onInput} className={cx(css.textArea, className)} rows={rows} ref={ref}/>);
});
export default TextArea;
