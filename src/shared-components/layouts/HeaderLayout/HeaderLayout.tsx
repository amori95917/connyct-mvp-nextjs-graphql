import { Header } from '@/shared-components/header';

type AccessTo = 'USER' | 'OWNER' | 'MANAGER' | 'EDITOR' | 'STAFF';

type HeaderLayoutProps = {
	children: React.ReactNode;
	accessTo?: AccessTo[];
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
