import css from './style.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import frame2x_wp from './imgs/iphone-frame@2x.webp';
import frame_wp from './imgs/iphone-frame.webp';
import frame2x from './imgs/iphone-frame@2x.jpg';
import frame from './imgs/iphone-frame.jpg';
import clamp from '../util/clamp';
import { cx } from '../util';
export default function ExploreProduct({ heading, text, items, className, style }) {
    const [dir, setDir] = useState(1), [activeIndex, setActiveIndex] = useState(0);
    const setActive = i => {
        if (typeof i === 'function')
            i = i(activeIndex);
        i = clamp(i, 0, items.length - 1);
        setDir(i > activeIndex ? 1 : -1);
        setTimeout(() => setActiveIndex(i), 0);
    };
    const [longestHeading, longestText] = useMemo(() => {
        let str = '', i = -1;
        items.map(({ heading, text }, index) => {
            const s = heading + text;
            if (s.length <= str.length)
                return;
            str = s;
            i = index;
        });
        return [
            items[i].heading,
            items[i].text,
        ];
    }, [items]);
    useEffect(() => {
        items?.map(item => {
            const img = new Image();
            img.src = item.image;
        });
    }, [items]);
    useEffect(() => {
        const onPress = e => {
            if (e.key === 'ArrowLeft')
                setActive(i => i - 1);
            if (e.key === 'ArrowRight')
                setActive(i => i + 1);
        };
        document.addEventListener('keyup', onPress);
        return () => {
            document.removeEventListener('keyup', onPress);
        };
    }, [setActive]);
    const onDragEnd = (e, { offset, velocity }) => {
        const swipe = Math.abs(offset.x) * velocity.x;
        if (swipe < -100)
            setActive(i => i + 1);
        else if (swipe > 100)
            setActive(i => i - 1);
    };
    const onTrackBtnClick = i => () => setActive(i);
    return (<div className={cx(css.wrap, className)} style={style}>
			<header className={css.header}>
				<h1>{heading}</h1>
				<p>{text}</p>
			</header>
			<div className={css.track}>
				{Array.from({ length: items.length }, (_, i) => (<button key={i} onClick={onTrackBtnClick(i)}>
						{activeIndex === i && <motion.span layoutId="track-active"/>}
					</button>))}
			</div>
			<header className={css.panelHeader}>
				<div className={css.height} aria-hidden="true">
					<h2>{longestHeading}</h2>
					<p>{longestText}</p>
				</div>
				<AnimatePresence initial={false}>
					<motion.div key={activeIndex} initial={{ opacity: 0, x: 100 * dir }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 * dir }} transition={{ type: 'tween', ease: 'easeInOut' }}>
						<h2>{items[activeIndex].heading}</h2>
						<p>{items[activeIndex].text}</p>
					</motion.div>
				</AnimatePresence>
			</header>
			<div className={css.frame}>
				<span className={css.island}/>
				<picture>
					<source srcSet={`${frame_wp?.src ?? frame_wp}, ${frame2x_wp?.src ?? frame2x_wp} 2x`} type="image/webp"/>
					<source srcSet={`${frame?.src ?? frame}, ${frame2x?.src ?? frame2x} 2x`} type="image/jpg"/>
					<img src={frame?.src ?? frame} alt=""/>
				</picture>
				<div className={css.content}>
					<AnimatePresence initial={false}>
						<motion.div key={activeIndex} initial={{ opacity: 1, x: 100 * dir + '%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 1, x: -100 * dir + '%', zIndex: -1 }} transition={{ type: 'tween', ease: 'easeInOut' }} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={1} onDragEnd={onDragEnd}>
							<img src={items[activeIndex].image} alt=""/>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</div>);
}
