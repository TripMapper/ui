import { createContext, useContext, useState } from 'react';
const defaultContextValue = {
    preferredLocale: 'en-US',
    slideoverDepth: 0,
    openSlideover: () => 0,
    closeSlideover: () => { },
};
const UIContext = createContext(defaultContextValue);
export function buildUIContext(appContext) {
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
        const next = { ...old };
        initial.value = next[handle];
        next[handle]++;
        return next;
    });
    return initial.value;
};
const decrementVal = (handle, set) => () => set(old => {
    const next = { ...old };
    next[handle]--;
    return next;
});
export function useUIContext() {
    return useContext(UIContext);
}
export function UIContextProvider({ defaultContext, children }) {
    const [uiContext, setUiContext] = useState({
        ...defaultContextValue,
        ...defaultContext,
    });
    const value = {
        ...uiContext,
        openSlideover: incrementVal('slideoverDepth', setUiContext),
        closeSlideover: decrementVal('slideoverDepth', setUiContext),
    };
    return (<UIContext.Provider value={value}>
			{children}
		</UIContext.Provider>);
}
export default UIContext;
