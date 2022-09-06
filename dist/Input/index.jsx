import Generic from './Generic';
import Color from './Color';
import { forwardRef } from 'react';
const Input = forwardRef(({ type, ...props }, ref) => {
    if (type?.toLowerCase() === 'color')
        return <Color {...props} ref={ref}/>;
    return <Generic type={type} {...props} ref={ref}/>;
});
export default Input;
