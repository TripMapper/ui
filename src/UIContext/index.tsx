import { createContext, useContext, useState } from 'react';
import { AppContext } from 'next/app';
import { I18nextProvider } from 'react-i18next';

// TODO: Tidy up & comment

interface IUIContextValue {
	preferredLocale: string;
	slideoverDepth: number;
	openSlideover: () => number;
	closeSlideover: () => void;
}

const defaultContextValue : IUIContextValue = {
	preferredLocale: 'en-US',
	slideoverDepth: 0,
	openSlideover: () => 0,
	closeSlideover: () => {},
};

const UIContext = createContext(defaultContextValue);

export function buildUIContext (appContext : AppContext) {
	const acceptLang = appContext.ctx.req.headers['accept-language'];

	let preferredLocale = 'en-US';

	if (acceptLang && acceptLang !== '*')
		preferredLocale = acceptLang.split(',', 1)?.[0] ?? 'en-US';

	return {
		preferredLocale,
	};
}

const incrementVal = (handle, set) => () => {
	const initial = { value: null };

	set(old => {
		const next = {...old};
		initial.value = next[handle];
		next[handle]++;
		return next;
	});

	return initial.value;
};

const decrementVal = (handle, set) => () => set(old => {
	const next = {...old};
	next[handle]--;
	return next;
});

export const UIContextPointer = { ref: null };

export function useUIContext () {
	return useContext(UIContext);
}

export function UIContextProvider ({ defaultContext, i18n = null, children }) {
	const [uiContext, setUiContext] = useState({
		...defaultContextValue,
		...defaultContext,
	});

	const value = {
		...uiContext,
		openSlideover: incrementVal('slideoverDepth', setUiContext),
		closeSlideover: decrementVal('slideoverDepth', setUiContext),
	};

	UIContextPointer.ref = value;

	const out = (
		<UIContext.Provider value={value}>
			{children}
		</UIContext.Provider>
	);

	return i18n ? (
		<I18nextProvider i18n={i18n}>
			{out}
		</I18nextProvider>
	) : out;
}

export default UIContext;
