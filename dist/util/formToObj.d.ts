/**
 * Converts the given FormData to an object
 *
 * @param {FormData} formData
 * @returns {string}
 */
export default function formToObj(formData: FormData): {
    [key: string]: string | boolean | number;
};
