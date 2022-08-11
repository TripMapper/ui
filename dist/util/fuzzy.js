/**
 * ## Fuzzy
 * A tiny and blazing-fast fuzzy search in JavaScript
 *
 * Shamelessly stolen from https://github.com/bevacqua/fuzzysearch
 * (but modified slightly, so it's okay)
 *
 * @param {string} needle - The thing to search for
 * @param {string} haystack - The thing to search in
 * @param {boolean} caseSensitive - Should the search be case-sensitive?
 * @return {boolean} - Whether we have a match
 */
export default function fuzzy(needle, haystack, caseSensitive = false) {
    if (typeof haystack === typeof {})
        haystack = JSON.stringify(Object.values(haystack));
    if (!caseSensitive) {
        needle = needle.toLowerCase();
        haystack = haystack.toLowerCase();
    }
    const hlen = haystack.length, nlen = needle.length;
    if (nlen > hlen)
        return false;
    if (nlen === hlen)
        return needle === haystack;
    outer: for (let i = 0, j = 0; i < nlen; i++) {
        const nch = needle.charCodeAt(i);
        while (j < hlen)
            if (haystack.charCodeAt(j++) === nch)
                continue outer;
        return false;
    }
    return true;
}
