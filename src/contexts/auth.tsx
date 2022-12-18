import React, { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';

import { cache, initializeApollo } from 'lib/apollo';
import { getCookie, setCookie, deleteCookie } from '@/utils/cookies';
import { CURRENT_USER_QUERY } from '@/graphql/user';

const AuthContext = React.createContext(
	{} as {
		user: any;
		authenticate: (newToken: string) => Promise<void>;
		logout: ({ redirectLocation: string }) => void;
		isLoading: boolean;
		isAuthenticated: boolean;
		token: string;
	}
);

const isTokenExpired = (token: string) => {
	const decode = JSON.parse(atob(token.split('.')[1]));
	const isExpired = new Date().getTime() > decode.exp * 1000;
	return isExpired;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const apolloClient = initializeApollo();
	const [user, setUser] = useState(null);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const isAuthenticated = !!user;

	const logout = useCallback(
		({ redirectLocation }: { redirectLocation: string }) => {
			deleteCookie('CONNYCT_USER');
			setUser(null);
			setIsLoading(false);
			router.push(redirectLocation || 'account/login');
		},
		[router]
	);

	const authenticate = useCallback(
		async token => {
			setIsLoading(true);
			try {
				if (isTokenExpired(token.accessToken)) {
					throw new Error('Token has expired');
				}
				const cachedUser = await cache.readQuery({
					query: CURRENT_USER_QUERY,
				});
				if (!cachedUser?.me) {
					const { data } = await apolloClient.query({
						query: CURRENT_USER_QUERY,
					});
					setUser(data.me);
				} else {
					setUser(cachedUser.me);
				}
				setCookie('CONNYCT_USER', token);
			} catch (error) {
				console.log({ error });
				setUser(null);
				deleteCookie('CONNYCT_USER');
			}
			setIsLoading(false);
		},
		[apolloClient]
	);

	useEffect(() => {
		const token = getCookie('CONNYCT_USER');
		if (!token) return;
		authenticate(token);
	}, []);

	// If we're not loading give the try to authenticate with the given
	useEffect(() => {
		if (!React.isValidElement(children)) return;

		const Component = children.type;

		// If it doesn't require auth, everything's good.
		if (!Component.requiresAuth) return;

		// If we're already authenticated, everything's good.
		if (isAuthenticated) return;

		// If we don't have a token in the cookies, logout
		const token = getCookie('CONNYCT_USER');
		if (!token) {
			return logout({ redirectLocation: Component.redirectUnauthenticatedTo });
		}

		// If we're not loading give the try to authenticate with the given token.
		if (!isLoading) {
			authenticate(token);
		}
	}, [children, logout, isLoading, isAuthenticated, authenticate]);

	const authContextValue = useMemo(
		() => ({
			user,
			authenticate,
			logout,
			isLoading,
			isAuthenticated: !!user,
			token: getCookie('CONNYCT_USER'),
		}),
		[user, isLoading, authenticate, logout]
	);

	return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
