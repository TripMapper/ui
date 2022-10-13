/// <reference types="react" />
import { AppContext } from 'next/app';
interface IUIContextValue {
    preferredLocale: string;
    slideoverDepth: number;
    openSlideover: () => number;
    closeSlideover: () => void;
}
declare const UIContext: import("react").Context<IUIContextValue>;
export declare function buildUIContext(appContext: AppContext): {
    preferredLocale: string;
};
export declare function useUIContext(): IUIContextValue;
export declare function UIContextProvider({ defaultContext, i18n, children }: {
    defaultContext: any;
    i18n?: any;
    children: any;
}): JSX.Element;
export default UIContext;
