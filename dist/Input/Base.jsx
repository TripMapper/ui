export default function Base({ type = 'text', className, ...props }) {
    return (<input type={type} className={className} {...props}/>);
}
