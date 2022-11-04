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
					<div className='bg-white rounded-md'>
						<p className='bg-primary font-bold p-4 rounded-t-md text-lg text-white'>My Connections</p>
						<div className='connection-options'>
							<ul>
								<li className='flex justify-between p-4 hover:bg-gray-100'>
									<span>Brands I Follow</span>
									<span>10</span>
								</li>
								<li className='flex justify-between p-4 hover:bg-gray-100'>
									<span>Contacts</span>
									<span>410</span>
								</li>
								<li className='flex justify-between p-4 hover:bg-gray-100'>
									<span>People I Follow</span>
									<span>114</span>
								</li>
								<li className='flex justify-between p-4 rounded-b-md hover:bg-gray-100'>
									<span>Groups</span>
									<span>4</span>
								</li>
							</ul>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default MyConnects;
