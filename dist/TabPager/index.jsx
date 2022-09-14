import css from './style.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { Children, useEffect, useMemo, useState } from 'react';
import { cx } from '../util';
const Page = ({ handle, children }) => children;
export { Page };
export default function TabPager({ active, children, className, pageClassName, withPadding = false, }) {
    const [_active, setActive] = useState(active);
    const [flip, setFlip] = useState(1);
    const [contents, handles] = useMemo(() => {
        const contents = {}, handles = [];
        Children.toArray(children).forEach(child => {
            if (child.type.name !== Page.name)
                throw Error('TabPager must have Page from TabPager as children only');
            const handle = child.props.handle;
            handles.push(handle);
            contents[handle] = child;
        }, {});
        return [contents, handles];
    }, [children]);
    useEffect(() => {
        const a = handles.indexOf(_active), b = handles.indexOf(active);
        setFlip(a > b ? -1 : 1);
        setTimeout(() => setActive(active), 0);
    }, [active, handles]);
    return (<div className={cx(css.content, className)}>
			<AnimatePresence initial={false}>
				<motion.div key={_active} className={cx(css.page, withPadding && css.withPadding, typeof pageClassName === 'function' ? pageClassName(_active) : pageClassName)} initial={{ x: `${100 * flip}%` }} animate={{ x: 0 }} exit={{ x: `${-100 * flip}%` }} transition={{ type: 'tween', ease: [0.250, 0.100, 0.250, 1.000], duration: 0.5 }}>
					{contents[_active] || null}
				</motion.div>
			</AnimatePresence>
		</div>);
}
