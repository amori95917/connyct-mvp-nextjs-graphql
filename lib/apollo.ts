import {
	ApolloClient,
	ApolloLink,
	InMemoryCache,
	NormalizedCacheObject,
	split,
} from '@apollo/client';
import { onError } from '@apollo/link-error';
import { createUploadLink } from 'apollo-upload-client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import merge from 'deepmerge';
import { IncomingHttpHeaders } from 'http';
import fetch from 'isomorphic-unfetch';
import isEqual from 'lodash/isEqual';
import type { AppProps } from 'next/app';
import { useMemo } from 'react';
import Cookies from 'js-cookie';
import { GRAPHQL_ENDPOINT } from '@/constants/constants';

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function authorization() {
	if (typeof window !== undefined) {
		const token = Cookies.get('CONNYCT_USER');
		const parsedToken = token ? JSON.parse(token) : {};
		return token ? `Bearer ${parsedToken?.accessToken}` : '';
	} else {
		return '';
	}
}

export const cache = new InMemoryCache({
	possibleTypes: {
		authenticatedItem: ['User'],
	},
});

const createApolloClient = (headers: IncomingHttpHeaders | null = null) => {
	const enhancedFetch = (url: RequestInfo, init: RequestInit) => {
		return fetch(url, {
			...init,
			headers: {
				...init.headers,
				Authorization: authorization(),
				'Access-Control-Allow-Origin': '*',
				Cookie: headers?.cookie ?? '',
			},
		}).then(response => response);
	};

	const errorLink: any = onError(({ graphQLErrors, networkError, operation, forward }) => {
		if (graphQLErrors) {
			for (let err of graphQLErrors) {
				console.log('err', err);
				// refresh token, clear cookies
				if (err.message === 'Forbidden resource') {
					// location.replace('/account/login');
				}
				const { message, extensions } = err; // extensions is important but need to send from server
				console.error(`[GraphQL error]: Message: ${message}`);
				// switch (err.extensions.code) {
				// }
			}
		}
		// graphQLErrors.forEach(({ message, locations, path }) =>
		// 	console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
		// );
		if (networkError)
			console.log(`[Network error]: ${networkError}. Backend is unreachable. Is it running?`);
	});

	const authUploadLink: any = createUploadLink({
		uri: GRAPHQL_ENDPOINT,
		fetchOptions: {
			mode: 'cors',
		},
		// credentials: 'include',
		fetch: enhancedFetch,
	});

	const wsLink =
		typeof window !== 'undefined'
			? new GraphQLWsLink(
					createClient({
						url: 'ws://localhost:3006/subscriptions', // should be GRAPHQL_WS_ENDPOINT
						// connectionParams: {
						// 	authToken: user.authToken,
						// },
					})
			  )
			: null;

	const hasSubscriptionOperation = ({ query }) => {
		const definition = getMainDefinition(query);
		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
	};

	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: ApolloLink.from([
			errorLink,
			typeof window !== 'undefined' && wsLink != null
				? ApolloLink.split(hasSubscriptionOperation, wsLink, authUploadLink)
				: authUploadLink,
		]),
		cache,
	});
};

type InitialState = NormalizedCacheObject | undefined;

interface IInitializeApollo {
	headers?: IncomingHttpHeaders | null;
	initialState?: InitialState | null;
}

export const initializeApollo = (
	{ headers, initialState }: IInitializeApollo = { headers: null, initialState: null }
) => {
	const _apolloClient = apolloClient ?? createApolloClient(headers);

	// If your page has Next.js data fetching methods that use Apollo Client, the initial state
	// get hydrated here
	if (initialState) {
		// Get existing cache, loaded during client side data fetching
		const existingCache = _apolloClient.extract();

		// Merge the existing cache into data passed from getStaticProps/getServerSideProps
		const data = merge(initialState, existingCache, {
			// combine arrays using object equality (like in sets)
			arrayMerge: (destinationArray, sourceArray) => [
				...sourceArray,
				...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
			],
		});

		// Restore the cache with the merged data
		_apolloClient.cache.restore(data);
	}

	// For SSG and SSR always create a new Apollo Client
	if (typeof window === 'undefined') return _apolloClient;
	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = _apolloClient;

	return _apolloClient;
};

export const addApolloState = (
	client: ApolloClient<NormalizedCacheObject>,
	pageProps: AppProps['pageProps']
) => {
	if (pageProps?.props) {
		pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
	}

	return pageProps;
};

export function useApollo(pageProps: AppProps['pageProps']) {
	const state = pageProps[APOLLO_STATE_PROP_NAME];
	const store = useMemo(() => initializeApollo({ initialState: state }), [state]);
	return store;
}
