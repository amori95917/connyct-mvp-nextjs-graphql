import { ApolloProvider } from '@apollo/client';
import { Raleway } from '@next/font/google';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import '@/styles/global.css';
import '@/styles/tailwind.css';
import { useApollo } from '../lib/apollo';

const poppins = Raleway({ weight: '400' });

type CustomPage = NextPage & {
	requiresAuth?: boolean;
	redirectUnauthenticatedTo?: string;
};
interface CustomAppProps extends Omit<AppProps, 'Component'> {
	Component: CustomPage;
}

export default function App({ Component, pageProps }: CustomAppProps) {
	const apolloClient = useApollo(pageProps);
	return (
		<>
			<Head>
				<title>Connyct | A bridge to connect brand and consumer</title>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<style jsx global>{`
					html {
						font-family: ${poppins.className};
					}
				`}</style>
			</Head>
			<ApolloProvider client={apolloClient}>
				<div className={`${poppins.className}`}>
					<Component {...pageProps} />
				</div>
			</ApolloProvider>
		</>
	);
}
