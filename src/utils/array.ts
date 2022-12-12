export function pick(object: Record<string, any>, keys: string[]) {
	return keys.reduce((obj, key) => {
		if (object && object.hasOwnProperty(key)) {
			obj[key] = object[key];
		}
		return obj;
	}, {});
}

// WARNING: This is not a drop in replacement solution and
// it might not work for some edge cases. Test your code!
export const omit = (obj: Record<string, any>, props: string[]) => {
	obj = { ...obj };
	props.forEach(prop => delete obj[prop]);
	return obj;
};
