import { Header } from '@/shared-components/header';

type HeaderLayoutProps = {
	children: React.ReactNode;
};

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ children }) => {
	return (
		<>
			<Header />
			<main className='p-5 relative top-16'>{children}</main>
		</>
	);
};

export default HeaderLayout;
