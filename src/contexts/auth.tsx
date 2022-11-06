import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery, gql } from '@apollo/client';

import { cache } from 'lib/apollo';
import { getCookie, setCookie, deleteCookie } from '@/utils/cookies';

const CURRENT_USER = gql`
	query currentUser {
		me {
			email
		}
	}
`;

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

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const isAuthenticated = !!user;
	const [getCurrentUser, { loading: userLoading, data }] = useLazyQuery(CURRENT_USER);

	const logout = ({ redirectLocation }) => {
		deleteCookie('CONNYCT_USER');
		// unauthenticateAPI();
		setUser(null);
		setIsLoading(false);
		router.push(redirectLocation || 'account/login');
	};

	const authenticate = async token => {
		setIsLoading(true);
		// authenticateAPI(token); inject token in header
		try {
			if (token && !isTokenExpired(token.accessToken)) {
				const cachedUser = await cache.readQuery({
					query: CURRENT_USER,
				});
				if (!cachedUser) {
					await getCurrentUser({
						variables: {},
					});
				}
			}
			setUser(data);
			setCookie('CONNYCT_USER', token);
		} catch (error) {
			console.log({ error });
			// unauthenticateAPI();
			setUser(null);
			deleteCookie('CONNYCT_USER');
		}
		setIsLoading(false);
	};

	useEffect(() => {
		const token = getCookie('CONNYCT_USER');
		if (!token) return;
		authenticate(token);
	}, []);

	useEffect(() => {
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
	}, [isLoading, isAuthenticated, children.type.requiresAuth]);

	return (
		<AuthContext.Provider
			value={{
				user,
				authenticate,
				logout,
				isLoading,
				isAuthenticated: !!user,
				token: getCookie('CONNYCT_USER'),
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
