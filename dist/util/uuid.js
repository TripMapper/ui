/**
 * Will generate a random UUID v4
 *
 * @see https://stackoverflow.com/a/2117523/550109
 * @return {string}
 */
export default function uuid() {
    // @ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}
