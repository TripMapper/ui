import Primary from './Primary';
import Secondary from './Secondary';
import Tertiary from './Tertiary';
import Text from './Text';
import { forwardRef } from 'react';
import Dashed from './Dashed';
import Flat from './Flat';
const Button = forwardRef(({ secondary = false, tertiary = false, text = false, dashed = false, flat = false, className, ...props }, ref) => {
    // @ts-ignore
    props.userClass = className;
    if (secondary)
        return <Secondary {...props} ref={ref}/>;
    if (tertiary)
        return <Tertiary {...props} ref={ref}/>;
    if (text)
        return <Text {...props} ref={ref}/>;
    if (dashed)
        return <Dashed {...props} ref={ref}/>;
    if (flat)
        return <Flat {...props} ref={ref}/>;
    return <Primary {...props} ref={ref}/>;
});
export default Button;
