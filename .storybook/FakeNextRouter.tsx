import { RouterContext } from 'next/dist/shared/lib/router-context';
import { useEffect, useRef, useState } from 'react';

export default function FakeNextRouter ({ defaultPath, children }) {
	const [path, setPath] = useState(defaultPath);
	const self = useRef();

	useEffect(() => {
		if (!self.current) return;

		Array.from((self.current as HTMLDivElement).getElementsByTagName('a')).forEach(a => {
			a.addEventListener('click', e => {
				e.preventDefault();
				setPath((e.target as HTMLAnchorElement).getAttribute('href'));
			});
		});
	}, [self]);

	return (
		<div ref={self}>
			<RouterContext.Provider value={{
				asPath: path,
				prefetch: () => Promise.resolve(void 0),
			} as any}>
				{children}
			</RouterContext.Provider>
		</div>
	);
}
