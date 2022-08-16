import css from './style.module.scss';
import { useEffect, useState } from 'react';
import persist from '../util/persist';

const decode = str => (new DOMParser()).parseFromString(str, 'text/html').documentElement.textContent;

export default function UrlToLink ({ url }) {
	const [title, setTitle] = useState(null)
		, [icon, setIcon] = useState(null);

	let safeUrl = url;
	if (url && url.indexOf('http') !== 0)
		safeUrl = 'http://' + safeUrl;

	useEffect(() => {
		if (!safeUrl) return;

		(async () => {
			try {
				const { title, icon } = await persist.get(safeUrl) as any;
				setTitle(decode(title));
				setIcon(icon);
				return;
			} catch (e) {}

			const data = await fetch(`${(process.env.API || process.env.NEXT_PUBLIC_API || 'https://dev.api.tripmapper.co/graphql').replace('graphql', 'lonk')}/${encodeURI(safeUrl)}`);
			const json = await data.json();
			if (json.title) {
				try { await persist.set(safeUrl, json); } catch (e) {}
				setTitle(decode(json.title));
				setIcon(json.icon);
			}
		})();
	}, [safeUrl]);

	const onClick = e => e.stopPropagation();

	return (
		<a
			href={safeUrl}
			className={css.link}
			target="_blank"
			rel="noopener noreferrer"
			onClick={onClick}
			title={title}
		>
			{icon && <img src={icon} alt=""/>}
			<span>{title || url}</span>
		</a>
	);
}
