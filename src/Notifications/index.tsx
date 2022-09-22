import css from './style.module.scss';
import { Listen, Signal } from '../util/signals';
import { useEffect, useState } from 'react';
import { uuid } from '../util';
import { AnimatePresence, motion } from 'framer-motion';
import notifySound from '../audio/notify.mp3';

type NotificationData = {
	message: string;
	type: 'info' | 'error' | 'success';
	text: string;
};

const Close = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9">
		<path fill="#D1CECA" d="M344.534712,10.2514037 L341.651736,13.1343798 C341.567934,13.218181 341.432066,13.218181 341.348264,13.1343798 L338.465288,10.2514037 C338.130083,9.91619875 337.586609,9.91619875 337.251404,10.2514037 C336.916199,10.5866087 336.916199,11.1300834 337.251404,11.4652884 L340.13438,14.3482644 C340.218181,14.4320657 340.218181,14.5679343 340.13438,14.6517356 L337.251404,17.5347116 C336.916199,17.8699166 336.916199,18.4133913 337.251404,18.7485963 C337.586609,19.0838012 338.130083,19.0838012 338.465288,18.7485963 L341.348264,15.8656202 C341.432066,15.781819 341.567934,15.781819 341.651736,15.8656202 L344.534712,18.7485963 C344.869917,19.0838012 345.413391,19.0838012 345.748596,18.7485963 C346.083801,18.4133913 346.083801,17.8699166 345.748596,17.5347116 L342.86562,14.6517356 C342.781819,14.5679343 342.781819,14.4320657 342.86562,14.3482644 L345.748596,11.4652884 C346.083801,11.1300834 346.083801,10.5866087 345.748596,10.2514037 C345.413391,9.91619875 344.869917,9.91619875 344.534712,10.2514037 Z" transform="translate(-337 -10)"/>
	</svg>
);

const icons = {
	info: (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
			<path fill="#4FDAFF" d="M28,16 C30.209139,16 32,17.790861 32,20 L32,20 L32,28 C32,30.209139 30.209139,32 28,32 L28,32 L20,32 C17.790861,32 16,30.209139 16,28 L16,28 L16,20 C16,17.790861 17.790861,16 20,16 L20,16 Z M24,23.1428571 C23.5266131,23.1428571 23.1428571,23.5266131 23.1428571,24 L23.1428571,24 L23.1428571,28 C23.1428571,28.4733869 23.5266131,28.8571429 24,28.8571429 C24.4733869,28.8571429 24.8571429,28.4733869 24.8571429,28 L24.8571429,28 L24.8571429,24 C24.8571429,23.5266131 24.4733869,23.1428571 24,23.1428571 Z M24,19.4285714 C23.3688174,19.4285714 22.8571429,19.940246 22.8571429,20.5714286 C22.8571429,21.2026111 23.3688174,21.7142857 24,21.7142857 C24.3031046,21.7142857 24.5937947,21.5938779 24.808122,21.3795506 C25.0224493,21.1652233 25.1428571,20.8745331 25.1428571,20.5714286 C25.1428571,19.940246 24.6311826,19.4285714 24,19.4285714 Z" transform="translate(-16 -16)"/>
		</svg>
	),
	error: (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
			<path fill="#FF4F4F" d="M28,16 C30.209139,16 32,17.790861 32,20 L32,20 L32,28 C32,30.209139 30.209139,32 28,32 L28,32 L20,32 C17.790861,32 16,30.209139 16,28 L16,28 L16,20 C16,17.790861 17.790861,16 20,16 L20,16 Z M24,23.1428571 C23.5266131,23.1428571 23.1428571,23.5266131 23.1428571,24 L23.1428571,24 L23.1428571,28 C23.1428571,28.4733869 23.5266131,28.8571429 24,28.8571429 C24.4733869,28.8571429 24.8571429,28.4733869 24.8571429,28 L24.8571429,28 L24.8571429,24 C24.8571429,23.5266131 24.4733869,23.1428571 24,23.1428571 Z M24,19.4285714 C23.3688174,19.4285714 22.8571429,19.940246 22.8571429,20.5714286 C22.8571429,21.2026111 23.3688174,21.7142857 24,21.7142857 C24.3031046,21.7142857 24.5937947,21.5938779 24.808122,21.3795506 C25.0224493,21.1652233 25.1428571,20.8745331 25.1428571,20.5714286 C25.1428571,19.940246 24.6311826,19.4285714 24,19.4285714 Z" transform="rotate(-180 16 16)"/>
		</svg>
	),
	success: (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
			<path fill="#4FFB7D" d="M16,4 C16,1.790861 14.209139,0 12,0 L4,0 C1.790861,0 0,1.790861 0,4 L0,12 C0,14.209139 1.790861,16 4,16 L12,16 C14.209139,16 16,14.209139 16,12 L16,4 Z M12.2457143,4.47085714 C12.4243706,4.61150291 12.5396349,4.81752807 12.566015,5.04336739 C12.5923951,5.26920672 12.5277172,5.49625077 12.3862857,5.67428571 L7.89257143,11.352 C7.67209569,11.6888823 7.31960444,11.9169898 6.92196708,11.9801069 C6.52432972,12.0432239 6.11852874,11.9354802 5.80457143,11.6834286 L3.76228571,10.1074286 C3.38736327,9.81834695 3.31777553,9.2800653 3.60685714,8.90514286 C3.89593876,8.53022041 4.43422041,8.46063267 4.80914286,8.74971429 L6.42057143,9.99428571 C6.54529403,10.0888115 6.72276294,10.0659287 6.81942857,9.94285714 L11.048,4.60914286 C11.3412229,4.24142263 11.8764107,4.17963091 12.2457143,4.47085714 Z"/>
		</svg>
	),
};

export default function Notifications () {
	const [notifications, setNotifications] = useState({});

	const remove = id => () => {
		setNotifications(n => {
			if (!n.hasOwnProperty(id))
				return n;

			const next = {...n};
			delete next[id];
			return next;
		});
	};

	useEffect(() => Listen(Signal.Notify, (message, type = 'info', text) => {
		const id = uuid();

		setNotifications(n => ({
			...n,
			[id]: { message, type, text },
		}));

		try {
			(new Audio(notifySound)).play();
		} catch (e) {}

		setTimeout(() => {
			remove(id)();
		}, 5000);
	}), []);

	return (
		<ul className={css.list}>
			<AnimatePresence initial={false}>
				{Object.entries(notifications).map(([id, { message, type, text }] : [string, NotificationData]) => (
					<motion.li
						key={id}
						className={css.item}
						layout
						initial={{ opacity: 0, y: -50, scale: 0.3 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
					>
						{icons?.[type] ?? null}
						<span>
							{message}
							{text && <small>{text}</small>}
						</span>
						<button
							onClick={remove(id)}
							title="Dismiss"
							className={css.dismiss}
						>
							<Close />
						</button>
					</motion.li>
				))}
			</AnimatePresence>
		</ul>
	);
}
