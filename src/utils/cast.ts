import { Scheme } from '@/types/scheme';

export const castScheme = (data: unknown) => {
	if (!isSchemeArray(data)) {
		throw new Error('Invalid data: array with Scheme type was expected');
	}

	return data as Scheme[];
};

const isScheme = (data: unknown) => {
	if (!data || typeof data !== 'object') {
		return false;
	}

	const targetObject = data as Record<string, unknown>;

	const hasStringName = typeof targetObject.name === 'string';
	const hasTheme =
		typeof targetObject.theme === 'string' &&
		(targetObject.theme === 'light' || targetObject.theme === 'dark');
	const hasColorScheme =
		typeof targetObject.colorScheme === 'object' &&
		targetObject.colorScheme !== null &&
		Object.keys(targetObject.colorScheme).every(
			(color) => typeof color === 'string'
		) &&
		Object.values(targetObject.colorScheme).every(
			(color) => typeof color === 'string'
		);

	return hasStringName && hasTheme && hasColorScheme;
};

const isSchemeArray = (data: unknown) => {
	return Array.isArray(data) && data.every(isScheme);
};
