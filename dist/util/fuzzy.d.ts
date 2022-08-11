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
export default function fuzzy(needle: any, haystack: any, caseSensitive?: boolean): boolean;
