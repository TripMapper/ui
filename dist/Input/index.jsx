import Generic from './Generic';
import Color from './Color';
export default function Input({ type, ...props }) {
    if (type?.toLowerCase() === 'color')
        return <Color {...props}/>;
    return <Generic type={type} {...props}/>;
}
