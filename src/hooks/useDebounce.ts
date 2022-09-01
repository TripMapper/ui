import { useMemo } from 'react';
import debounce from 'lodash.debounce';

export default function useDebounce (callback, delay = 350, dependencies = []) {
	return useMemo(() => debounce(callback, delay), dependencies);
}
