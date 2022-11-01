import Cookies from 'js-cookie';

interface CookieAttributes {
	expires?: number | Date | undefined;
	path?: string | undefined;
	domain?: string | undefined;
	secure?: boolean | undefined;
	sameSite?: 'strict' | 'Strict' | 'lax' | 'Lax' | 'none' | 'None' | undefined;
	[property: string]: any;
}

export function setCookie(
	name: string,
	value: string | Record<string, any> | Array<Record<string, any>>,
	args: CookieAttributes = {}
) {
	return Cookies.set(name, JSON.stringify(value), args);
}

export function getAllCookies() {
	return Cookies.get();
}

export function getCookie(name: string) {
	const cookie = Cookies.get(name);
	if (cookie) {
		const parsedCookie = JSON.parse(Cookies.get(name) || '');
		return parsedCookie;
	}
}

export function deleteCookie(name: string, args: CookieAttributes = {}) {
	return Cookies.remove(name, args);
}
