import { forwardRef } from 'react';
import A from '../A';
const Base = forwardRef(({ className, children, prefix, suffix, disabled = false, onClick, href, target, type = 'submit', }, ref) => {
    const El = href ? A : 'button';
    const props = href ? {
        href,
        target,
        rel: target === '_blank' ? 'noreferrer' : '',
    } : {
        onClick,
        type,
    };
    return (<El className={className} disabled={disabled} 
    /*@ts-ignore*/
    ref={ref} {...props}>
			{prefix}
			{children}
			{suffix}
		</El>);
});
export default Base;
