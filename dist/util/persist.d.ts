declare const _default: {
    set: () => void;
    get: () => void;
    remove: () => void;
} | {
    set: <T>(key: string, value: T, callback?: (err: any, value: T) => void) => Promise<T>;
    get: <T_1>(key: string, callback?: (err: any, value: T_1) => void) => Promise<T_1>;
    remove: (key: string, callback?: (err: any) => void) => Promise<void>;
};
export default _default;
