import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang='en' dir='ltr'>
				<Head>
					{/* <link rel="icon" type="image/png" href="/connyct.ico" /> */}
					{/* Maybe use next-seo */}
				</Head>
				<body className='antialiased bg-light-bg flex flex-col h-screen overflow-y-scroll text-gray-900 dark:bg-dark dark:text-light'>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
