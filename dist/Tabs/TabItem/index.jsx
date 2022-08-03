import css from './style.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import cx from '../../util/cx';
export default function TabItem({ uri, name, exact = false, onClick, isActive = false, tabLayoutId }) {
    const { asPath } = useRouter() ?? {};
    const isActiveRoute = uri ? exact ? asPath === uri : asPath.startsWith(uri) : false;
    const _isActive = isActiveRoute || isActive;
    return (<li className={css.li}>
			{uri ? (<Link href={uri}><a className={cx(css.item, _isActive && css.itemActive)}>{name}</a></Link>) : (<button onClick={onClick} className={cx(css.item, _isActive && css.itemActive)}>{name}</button>)}
			{_isActive && <motion.span className={css.active} layoutId={tabLayoutId}/>}
		</li>);
}
