import css from './style.module.scss';
import {
	Children,
	cloneElement,
	ReactElement, ReactFragment, ReactNode, Ref,
	useEffect,
	useRef,
	useState
} from 'react';
import { nanoid } from 'nanoid';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { usePopper } from 'react-popper';
import cx from '../util/cx';

export interface ContextMenuProps {
	children: ReactElement;
	menu: ReactFragment | ReactElement | ReactNode;
	isOpen?: (boolean) => void;
}

export default function ContextMenu ({ children, menu, isOpen } : ContextMenuProps) {
	const isSSR = typeof window === 'undefined' || typeof window.document === 'undefined';
	const { current: uid } = useRef('cxm_' + nanoid(5));
	const [trigger, setTrigger] = useState()
		, [cxm, setCxm] = useState();

	const popper = usePopper(trigger, cxm, {
		placement: 'bottom-end',
		modifiers: [
			{
				name: 'offset',
				options: {
					offset: [0, 5],
				},
			},
		],
	});
	const [open, _setOpen] = useState(false);
	const setOpen = v => {
		_setOpen(v);
		isOpen?.(v);
	};

	const c = Children.only(children);
	const child = cloneElement(c, {
		...c.props,
		ref: setTrigger,
		className: cx(c.props.className, css.trigger),
	});

	useEffect(() => {
		if (!trigger) return;
		const el : HTMLElement = trigger;
		el.setAttribute('role', 'button');
		el.setAttribute('aria-haspopup', 'menu');
		el.setAttribute('aria-controls', uid);
		el.setAttribute('aria-expanded', open ? 'true' : 'false');

		const onClick = e => {
			c.props.onClick?.(e);
			setOpen(true);
		};

		el.addEventListener('click', onClick);

		return () => {
			el.removeEventListener('click', onClick);
		};
	}, [trigger, open, uid]);

	useEffect(() => {
		if (!cxm || isSSR) return;

		const el = cxm as HTMLElement
			, trg = trigger as HTMLElement;
		el.focus();

		const onDomClick = e => {
			if (e.target === el || el.contains(e.target))
				return;

			setOpen(false);
			trg?.focus();
		};

		document.body.addEventListener('click', onDomClick, true);

		return () => {
			document.body.removeEventListener('click', onDomClick, true);
		};
	}, [open, cxm]);

	if (isSSR)
		return child;

	return (
		<>
			{child}
			{createPortal(
				<AnimatePresence>
					{open && (
						<motion.ul
							ref={setCxm as unknown as Ref<HTMLUListElement>}
							className={css.ctxMenu}
							style={popper.styles.popper}
							{...popper.attributes.popper}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.15 }}
							id={uid}
						>
							{menu}
						</motion.ul>
					)}
				</AnimatePresence>
			, document.body)}
		</>
	);
}
