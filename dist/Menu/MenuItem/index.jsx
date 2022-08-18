import css from './style.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import cx from '../../util/cx';
import Icon from '../../Icon';
export default function MenuItem({ name, uri, exact, icon }) {
    const { asPath } = useRouter();
    const isActive = exact ? asPath === uri : asPath.startsWith(uri);
    return (<li key={uri} className={css.li}>
			<Link href={uri}>
				<a className={cx(css.item, isActive && css.itemActive)}>
					{icon && <Icon of={icon} l/>}
					{name}
				</a>
			</Link>
			{isActive && (<motion.span className={css.active} layoutId="activeMenuItem"/>)}
		</li>);
}
