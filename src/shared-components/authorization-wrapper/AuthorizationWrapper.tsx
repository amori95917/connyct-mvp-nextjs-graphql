import jwtDecode from 'jwt-decode';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { ReactNode, useCallback, useEffect, useState } from 'react';

import { User } from '@/generated/graphql';
import { useCurrentUser } from '@/hooks/services/useCurrentUserQuery';
import { Loader } from '@/ui-elements/atoms/loader';
import { getCookie } from '@/utils/cookies';

type AllowedRoles = 'USER' | 'OWNER' | 'MANAGER' | 'EDITOR' | 'STAFF';

type AuthorizationWrapperProps = {
	allowedRoles: AllowedRoles[];
	// currentUser: User;
	children: ReactNode;
};

type AuthError = {
	errorType: string;
	error?: Error;
};

const AuthroizationWrapper = (props: AuthorizationWrapperProps) => {
	const { allowedRoles, children } = props;
	const { authError, isAuthLoading, authenticatedUser } = useAuth(allowedRoles);
	console.log('currentUser in authorizationWrapper', authenticatedUser);
	if (authError) {
		switch (authError.errorType) {
			case 'invalid_token':
				return <p>Your login session is invalid. Please log in again.</p>;
			case 'unauthorized':
				return <p>You do not have access to this page.</p>;
			default:
				return <p>Some error occured</p>;
		}
	}
	if (isAuthLoading) {
		return <Loader />;
	}
	return <>{children}</>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	console.log('ctx', context.req);
	return {
		props: {}, // will be passed to the page component as props
	};
}

export default AuthroizationWrapper;

const useAuth = (allowedRoles: string[]) => {
	const { currentUser } = useCurrentUser();
	const router = useRouter();
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [authenticatedUser, setAuthenticatedUser] = useState<User | undefined>(undefined);
	const [authError, setAuthError] = useState<AuthError | undefined>(undefined);
	const [isAuthLoading, setIsAuthLoading] = useState(true);

	const authenticateUser = useCallback(
		(user: User, accessToken: string) => {
			const roles = user?.roles ?? [];
			// Check if the token is valid and not expired
			if (isTokenValid(accessToken) && !isTokenExpired(accessToken)) {
				// Check if the user has one of the allowed roles
				if (roles?.some(role => role.name && allowedRoles.includes(role.name))) {
					setAuthenticatedUser(user);
					setAuthError(undefined);
					setIsAuthLoading(false);
				} else {
					// If the user does not have one of the allowed roles, show an error message
					setAuthError({ errorType: 'unauthorized' });
					setIsAuthLoading(false);
				}
			} else {
				// If the token is about to expire, refresh the token and set the new token in a cookie
				if (isTokenAboutToExpire(accessToken)) {
					setIsRefreshing(true);
				}

				// If the token is already expired, redirect the user to the login page
				router.push('/account/login');
			}
		},
		[allowedRoles, router]
	);

	useEffect(() => {
		if (!isRefreshing) {
			const { accessToken } = getCookie('CONNYCT_USER');
			authenticateUser(currentUser, accessToken);
		}
	}, [currentUser, isRefreshing, authenticateUser]);

	return {
		authenticatedUser,
		authError,
		isAuthLoading,
	};
};

const isTokenValid = (token: string) => {
	try {
		jwtDecode(token);
		return true;
	} catch (error) {
		return false;
	}
};

const isTokenExpired = (token: string) => {
	try {
		const decodedToken: Record<string, any> = jwtDecode(token);
		return decodedToken.exp < Date.now() / 1000;
	} catch (error) {
		return true;
	}
};

const isTokenAboutToExpire = (token: string) => {
	try {
		const decodedToken: Record<string, any> = jwtDecode(token);
		const tokenExpirationTime = decodedToken.exp * 1000;
		const timeUntilExpiration = tokenExpirationTime - Date.now();
		return timeUntilExpiration < 3600000; // 1 hour in milliseconds
	} catch (error) {
		return true;
	}
};
