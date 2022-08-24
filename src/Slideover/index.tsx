import css from './style.module.scss';
import Modal from 'react-modal';
import {
	Children, LegacyRef,
	ReactNode,
	useEffect, useId,
	useMemo, useRef,
	useState
} from 'react';
import { useUIContext } from '../UIContext';
import { cx } from '../util';
import SlideoverEdit from '../svg/slideover-edit.svg';
import SlideoverDelete from '../svg/slideover-delete.svg';
import SlideoverClose from '../svg/slideover-close.svg';
import { AnimatePresence, motion } from 'framer-motion';
import Tabs from '../Tabs';

type SlideoverChild = (depth: number, isTop: boolean) => ReactNode;
type SlideoverHeading = (tabs: ReactNode) => ReactNode;

export interface SlideoverProps {
	isOpen: boolean;
	onRequestClose: () => void;
	onEditClick?: () => void;
	onDeleteClick?: () => void;
	children: ReactNode | SlideoverChild | any;
	heading?: string | SlideoverHeading | null;
	wide?: boolean;
}

export interface SlideoverPanelProps {
	name: string;
	handle: string;
	icon?: ReactNode,
	children: ReactNode | SlideoverChild | any;
	/** @default false */
	defaultActive?: boolean;
}

const setAppElement = (Modal as any).setAppElement;
const Panel = ({ name, handle, icon = null, children, defaultActive = false } : SlideoverPanelProps) => children;

export { setAppElement, Panel };

export default function Slideover ({
	isOpen, onRequestClose,
	heading, onEditClick, onDeleteClick,
	children, wide = false,
} : SlideoverProps) {
	const tabsLayoutId = useId();

	const [wasOpen, setWasOpen] = useState(isOpen)
		, [depth, setDepth] = useState(0)
		, { openSlideover, closeSlideover, slideoverDepth } = useUIContext();

	const [activeTab, _setActiveTab] = useState('')
		, [flip, setFlip] = useState(1);

	const offset = slideoverDepth - depth - 1;

	const { tabs, handles, contents, filteredChildren } = useMemo(() => {
		if (!children)
			return { tabs: [], handles: [], contents: {} };

		const count = Children.count(children)
			, asArray = Children.toArray(children as any);

		if (count === 1 && (asArray?.[0] as any)?.type?.name !== Panel.name)
			return {
				tabs: [],
				handles: [],
				contents: {},
				filteredChildren: typeof children === 'function' ? children(depth, offset === 0) : children,
			};

		if (count > 1) {
			let hasPanel = false, hasNonPanel = false;
			Children.forEach(children as ReactNode, child => {
				if (child !== null && (child as any).type.name === Panel.name) hasPanel = true;
				else hasNonPanel = true;
			});

			if (hasPanel && hasNonPanel) {
				throw new Error('Can\'t mix Slideout panels and other elements!');
			} else if (!hasPanel && hasNonPanel) {
				return {
					tabs: [],
					handles: [],
					contents: {},
					filteredChildren: typeof children === 'function' ? children(depth, offset === 0) : children,
				};
			}
		}

		let active = '';

		const { tabs, handles, contents, filteredChildren } = Children.toArray(children as ReactNode).reduce((set, child) => {
			const { name, icon, handle, children, defaultActive } = (child as any).props as SlideoverPanelProps;

			if (activeTab === '' && defaultActive)
				active = handle;

			set.tabs.push({ name, icon, onClick: () => setActiveTab(handle), isActive: handle === activeTab });
			set.handles.push(handle);
			set.contents[handle] = typeof children === 'function' ? children(depth, offset === 0) : children;

			return set;
		}, { tabs: [], handles: [], contents: {}, filteredChildren: null });

		if (activeTab === '')
			_setActiveTab(active || handles[0]);

		return {
			tabs,
			handles,
			contents,
			filteredChildren,
		};
	}, [children, depth, offset, activeTab]);

	useEffect(() => {
		if (wasOpen && !isOpen) closeSlideover();
		setWasOpen(isOpen);
	}, [isOpen]);

	const setActiveTab = tab => {
		const a = handles.indexOf(activeTab)
			, b = handles.indexOf(tab);

		setFlip(a > b ? -1 : 1);

		requestAnimationFrame(() => _setActiveTab(tab));
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			closeTimeoutMS={300}
			onAfterOpen={() => {
				setDepth(openSlideover());
			}}
			style={{
				content: {
					'--f-offset': (offset / 100) + (offset / 100),
					'--offset': offset > 0 ? `calc(-${40 * (1 - (((offset * 5) / 100)))}px * ${offset})` : '0px',
				},
			}}
			className={{
				base: cx(
					css.slideover,
					offset === 0 && css.top,
					wide && css.wide,
				),
				afterOpen: css.afterOpen,
				beforeClose: css.beforeClose,
			}}
			overlayClassName={css.overlay}
		>
			<div className={css.controls}>
				{onDeleteClick && <button title="Delete" onClick={onDeleteClick}><SlideoverDelete /></button>}
				{onEditClick && <button title="Edit" onClick={onEditClick}><SlideoverEdit /></button>}
				<button title="Close" onClick={onRequestClose}><SlideoverClose /></button>
			</div>
			{!heading || typeof heading === 'string' ? (
				<header className={cx(css.header, handles.length > 0 && css.hasTabs)}>
					{heading && <h1>{heading as string}</h1>}
					{tabs.length > 0 && (
						<Tabs
							tabsLayoutId={tabsLayoutId}
							className={css.tabs}
							items={tabs}
						/>
					)}
				</header>
			) : heading(
				tabs.length > 0 && (
					<Tabs
						tabsLayoutId={tabsLayoutId}
						className={css.tabs}
						items={tabs}
					/>
				)
			)}
			<div className={cx(css.content, handles.length > 0 && css.hasTabs)}>
				{handles.length > 0 && (
					<AnimatePresence initial={false}>
						<motion.div
							key={activeTab}
							className={css.tab}
							initial={{ x: `${100 * flip}%` }}
							animate={{ x: 0 }}
							exit={{ x: `${-100 * flip}%` }}
							transition={{ type: 'tween', ease: [0.250, 0.100, 0.250, 1.000], duration: 0.5 }}
						>
							{contents[activeTab] || null}
						</motion.div>
					</AnimatePresence>
				)}
				{filteredChildren}
			</div>
		</Modal>
	);
}

Slideover.setAppElement = setAppElement;
