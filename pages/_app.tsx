import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { Poppins } from '@next/font/google';

import { AuthProvider } from '@/contexts/auth';
import '@/styles/tailwind.css';
import '@/styles/global.css';
import { useApollo } from '../lib/apollo';

const poppins = Poppins({ weight: '400' });

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
				{Component.requiresAuth && (
					<script
						// If no token is found, redirect inmediately
						dangerouslySetInnerHTML={{
							__html: `if(!document.cookie || document.cookie.indexOf('CONNYCT_USER') === -1)
            {location.replace(
              "/account/login?next=" +
                encodeURIComponent(location.pathname + location.search)
            )}
            else {document.documentElement.classList.add("render")}`,
						}}
					/>
				)}
			</Head>
			<ApolloProvider client={apolloClient}>
				<AuthProvider>
					<Component {...pageProps} />
				</AuthProvider>
			</ApolloProvider>
		</>
	);
}
