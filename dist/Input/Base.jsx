import parseNumberLocale from '../util/parseNumberLocale';
function Base({ type = 'text', className, ...props }) {
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
    return (<input type={type} className={className} {...props}/>);
}
export default Base;
