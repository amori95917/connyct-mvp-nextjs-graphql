import { Company } from '@/generated/graphql';
import { Avatar } from '@/shared-components/avatar';
import Link from 'next/link';

type ConnectedBrandProps = {
	brand: Company;
};
const ConnectedBrand = (props: ConnectedBrandProps) => {
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
					<Link href={`/brands/${brand.id}/products`}>
						<button className='bg-brandSecondary cursor-pointer flex flex-col h-10 items-center mr-4 py-2 rounded-md text-white w-28 hover:font-bold hover:shadow-xl'>
							Products
						</button>
					</Link>
					<Link href={`/brands/${brand.id}/feeds`}>
						<button className='bg-primary cursor-pointer flex flex-col h-10 items-center py-2 rounded-md text-white w-28 hover:font-bold hover:shadow-xl'>
							Feeds
						</button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default ConnectedBrand;
