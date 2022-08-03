export default function empty(val) {
    return val === void 0
        || val === null
        || (Array.isArray(val) && val.length === 0);
}
