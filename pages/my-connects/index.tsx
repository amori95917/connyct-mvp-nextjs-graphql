// import { Sidebar, Widgets } from '@/components/feeds';
import { MyConnects } from '@/pages/my-connects';
import { AuthorizationWrapper } from '@/shared-components/authorization-wrapper';
import { HeaderLayout } from '@/shared-components/layouts';

const MyConnectPage = () => {
	return (
		<>
			<AuthorizationWrapper allowedRoles={['USER']}>
				<HeaderLayout>
					<div className='container mx-auto'>
						<div className='flex'>
							<div className='w-full'>
								<MyConnects />
							</div>
						</div>
					</div>
				</HeaderLayout>
			</AuthorizationWrapper>
		</>
	);
};

export default MyConnectPage;
