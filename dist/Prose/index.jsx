import { Children } from 'react';
import parse from 'html-react-parser';
export default function Prose({ children }) {
    return (<>
			{Children.map(children, child => {
            if (typeof child === 'string') {
                const parsed = parse(child);
                if (typeof parsed === 'string')
                    return <p>{parsed}</p>;
                return parsed;
            }
            return child;
        })}
		</>);
}
