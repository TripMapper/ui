import localforage from 'localforage';

export default (() => {
	// @ts-ignore
	if (!process.browser) return {
		set: () => {},
		get: () => {},
		remove: () => {},
	};

	localforage.config({
		name: 'TripMapper Forage',
	});

	return {
		set: localforage.setItem,
		get: localforage.getItem,
		remove: localforage.removeItem,
	};
})();
