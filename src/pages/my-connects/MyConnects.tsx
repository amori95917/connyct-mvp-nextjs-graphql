import { MyConnectionsWidget } from '@/shared-components/widgets/my-connections';
import FollowedBrands from './followed-brands';
import People from './people-i-may-know';

const MyConnects = () => {
	return (
		<>
			<div className='container gap-4 grid grid-cols-1 mx-auto pt-1 md:grid-cols-4'>
				<section className='connections md:col-span-3'>
					<FollowedBrands />
					<People />
				</section>
				<section className='h-screen sidebar sticky top-24'>
					<MyConnectionsWidget />
				</section>
			</div>
		</>
	);
};

export default MyConnects;
