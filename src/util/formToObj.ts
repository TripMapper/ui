import get from 'lodash.get';
import set from 'lodash.set';

const RID_RX = /rid_\w{5}/;

/**
 * Converts the given FormData to an object
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

		if (typeof value === 'string' && value === '')
			value = null;

		set(object, key, value);
	});

	keysToArrayify.forEach(key => {
		set(object, key, Object.values(get(object, key)));
	});

	return object;
}
