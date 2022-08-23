import css from './style.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import cx from '../../util/cx';
import { Icons } from '../../Types';
import Icon from '../../Icon';

export interface TabItemProps {
	name: string;
	uri?: string;
	onClick?: () => void;
	/** @default false */
	exact?: boolean;
	/** @default false */
	isActive?: boolean;
	icon?: Icons;
}

interface TabItemPropsWithLayoutId extends TabItemProps {
	tabLayoutId: string;
}

export default function TabItem ({ uri, name, exact = false, onClick, isActive = false, tabLayoutId, icon } : TabItemPropsWithLayoutId) {
	const { asPath } = useRouter() ?? {};
	const isActiveRoute = uri ? exact ? asPath === uri : asPath.startsWith(uri) : false;
	const _isActive = isActiveRoute || isActive;

	return (
		<li className={css.li}>
			{uri ? (
				<Link href={uri}>
					<a className={cx(css.item, _isActive && css.itemActive, icon && css.hasIcon)}>
						{icon && <Icon of={icon} xl />}
						{name}
					</a>
				</Link>
			) : (
				<button
					onClick={onClick}
					className={cx(css.item, _isActive && css.itemActive, icon && css.hasIcon)}
				>
					{icon && <Icon of={icon} xl />}
					{name}
				</button>
			)}
			{_isActive && <motion.span className={css.active} layoutId={tabLayoutId} />}
		</li>
	);
}
