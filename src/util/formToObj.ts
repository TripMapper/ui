import get from 'lodash.get';
import set from 'lodash.set';
import parseBool from './parseBool';

const RID_RX = /rid_\w{5}/;

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
export default function formToObj (formData : FormData): { [key: string]: string|boolean|number } {
	const object = {}
		, keysToArrayify = [];

	formData.forEach((value, key) => {
		if (RID_RX.test(key))
		{
			const keyUpTo = key.split(RID_RX)[0];
			if (keysToArrayify.indexOf(keyUpTo) === -1)
				keysToArrayify.push(keyUpTo);
		}

		if (typeof value === 'string') {
			if (value === '' || value === null || value === void 0) value = null;
			else if ((value as string).startsWith('(bool)')) value = parseBool((value as string).slice(6)) as any;
			else if ((value as string).startsWith('(number)')) value = +((value as string).slice(8)) as any;
		}

		if (key.endsWith('[]')) {
			const k = key.slice(0, -2);
			const arr = get(object, k);
			if (arr) arr.push(value);
			else set(object, k, [value]);
		} else {
			set(object, key, value);
		}
	});

	keysToArrayify.forEach(key => {
		set(object, key, Object.values(get(object, key)));
	});

	return object;
}
