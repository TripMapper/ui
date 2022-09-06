import { forwardRef } from 'react';
import parseNumberLocale from '../util/parseNumberLocale';
const Base = forwardRef(({ type = 'text', className, ...props }, ref) => {
    const isNumeric = type === 'numeric';
    if (isNumeric) {
        type = 'text';
        props.inputMode = 'numeric';
        props.pattern = '[,.\\d]*';
        const oldOnChange = props.onChange;
        props.onChange = e => {
            e.persist();
            e.numericValue = () => parseNumberLocale(e.target.value, e.target.value);
            oldOnChange?.(e);
        };
    }
    return (<input type={type} className={className} {...props} ref={ref}/>);
});
export default Base;
