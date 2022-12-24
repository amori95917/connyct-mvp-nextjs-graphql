import { Company } from '@/generated/graphql';
import { Avatar } from '@/shared-components/avatar';

type ConnectedEvangelistProps = {
	brand: Company;
};
const ConnectedEvangelist = (props: ConnectedEvangelistProps) => {
	const { brand } = props;
	const handleFollow = (brandId: string) => {
		console.log('Follow');
	};
	const handleUnfollow = (brandId: string) => {
		console.log('unfollow');
	};
	return (
		<>
			<div className='flex items-center justify-between mt-5 w-full'>
				<div className='flex items-center w-full'>
					<div className='h-16 overflow-hidden relative rounded-full w-16'>
						<Avatar
							imgSrc={brand.avatar}
							name={brand.name || brand.legalName || ''}
							size='lg'
							alt={brand.name || brand.legalName || ''}
						/>
					</div>
					<div className='ml-5'>
						<span className='flex flex-col'>
							<span className='font-bold'> {brand.legalName}</span>
							<span className='text-slate-400'>{brand.followers || '0'} followers</span>
						</span>
					</div>
				</div>
				<div className='flex justify-end w-full'>
					<button
						onClick={() => handleUnfollow(brand.id || '')}
						className='bg-gray-300 cursor-pointer flex flex-col h-10 items-center mr-4 py-2 rounded-md text-white w-28 hover:font-bold hover:shadow-xl'>
						Unfollow
					</button>
					<button
						onClick={() => handleFollow(brand.id || '')}
						className='bg-primary cursor-pointer flex flex-col h-10 items-center py-2 rounded-md text-white w-28 hover:font-bold hover:shadow-xl'>
						Follow
					</button>
				</div>
			</div>
		</>
	);
};

export default ConnectedEvangelist;
