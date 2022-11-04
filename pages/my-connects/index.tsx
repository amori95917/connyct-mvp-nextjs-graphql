// import { Sidebar, Widgets } from '@/components/feeds';
import { HeaderLayout } from '@/shared-components/layouts';
import { MyConnects } from '@/pages/my-connects';

const MyConnectPage = () => {
	return (
		<>
			<HeaderLayout>
				<div className='container mx-auto'>
					<div className='flex'>
						{/* <Sidebar /> */}
						<div className='w-full'>
							<MyConnects />
						</div>
						{/* <Widgets /> */}
					</div>
				</div>
			</HeaderLayout>
		</>
	);
};

MyConnectPage.auth = true;

export default MyConnectPage;
