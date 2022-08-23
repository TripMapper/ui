import { useEffect, useState } from 'react';

export default function useClock (ms = 1000) {
	const [clock, setClock] = useState(false);

	useEffect(() => {
		const iv = setInterval(
			() => setClock(c => !c),
			ms
		);

		return () => clearInterval(iv);
	});

	return clock;
}
