// import { Sidebar, Widgets } from '@/components/feeds';
import { HeaderLayout } from '@/shared-components/layouts';
import { MyConnects } from '@/pages/my-connects';

const MyConnectPage = () => {
	return (
		<>
			<HeaderLayout>
				<div className='container mx-auto'>
					<div className='flex'>
						<div className='w-full'>
							<MyConnects />
						</div>
					</div>
				</div>
			</HeaderLayout>
		</>
	);
};

MyConnectPage.auth = true;

export default MyConnectPage;
