import css from './style.module.scss';
import { forwardRef, useCallback, useEffect, useRef } from 'react';
import { cx, mergeRefs } from '../util';
const TextArea = forwardRef(({ className, onInput, rows = 4, ...props }, ref) => {
    const self = useRef();
    const _onInput = useCallback(e => {
        e.persist();
        let { borderTopWidth, borderBottomWidth } = window.getComputedStyle(e.target);
        borderTopWidth = +borderTopWidth.replace(/[^\d.]/g, '');
        borderBottomWidth = +borderBottomWidth.replace(/[^\d.]/g, '');
        e.target.style.height = '';
        e.target.style.height = (e.target.scrollHeight + borderTopWidth + borderBottomWidth) + 'px';
        onInput?.(e);
    }, [onInput]);
    useEffect(() => {
        if (!self.current)
            return;
        self.current.dispatchEvent(new Event('input', { bubbles: true }));
    }, [self]);
    return (<textarea {...props} onInput={_onInput} className={cx(css.textArea, className)} rows={rows} ref={mergeRefs([ref, self])}/>);
});
export default TextArea;
