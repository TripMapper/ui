/**
 * Converts the given FormData to an object
 *
 * Empty strings ('') are converted to `null`
 * Strings prefixed with a bool cast ('(bool)yes') are converted to a boolean
 * Strings prefixed with a number cast ('(number)10.5') are converted to a number
 *
 * @param {FormData} formData
 * @returns {string}
 */
export default function formToObj(formData: FormData): {
    [key: string]: string | boolean | number;
};
