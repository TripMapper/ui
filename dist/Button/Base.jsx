import { forwardRef } from 'react';
import A from '../A';
const Base = forwardRef(({ className, children, prefix, suffix, disabled = false, onClick, href, target, type = 'submit', El = 'button', }, ref) => {
    const InEl = href ? A : El;
    const props = href ? {
        href,
        target,
        rel: target === '_blank' ? 'noreferrer' : '',
    } : {
        onClick,
        type,
    };
    return (
    /*@ts-ignore*/
    <InEl className={className} disabled={disabled} 
    /*@ts-ignore*/
    ref={ref} {...props}>
			{prefix}
			{children}
			{suffix}
		</InEl>);
});
export default Base;
