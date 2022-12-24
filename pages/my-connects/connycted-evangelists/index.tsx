import { HeaderLayout } from '@/shared-components/layouts';
import { MyConnectionsWidget } from '@/shared-components/widgets/my-connections';

import { ConnectedEvangelists } from '@/pages/my-connects/connected-evangelists';

const ConnectedEvangelistsPage = () => {
	return (
		<>
			<HeaderLayout>
				<div className='container mx-auto'>
					<div className='flex'>
						<div className='w-full'>
							<div className='container gap-4 grid grid-cols-1 mx-auto pt-1 md:grid-cols-4'>
								<section className='connections md:col-span-3'>
									<ConnectedEvangelists />
								</section>
								<section className='h-screen sidebar sticky top-24'>
									<MyConnectionsWidget />
								</section>
							</div>
						</div>
					</div>
				</div>
			</HeaderLayout>
		</>
	);
};

export default ConnectedEvangelistsPage;
