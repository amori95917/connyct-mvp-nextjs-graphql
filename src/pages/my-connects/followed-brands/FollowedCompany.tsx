import Link from 'next/link';
import Image from 'next/image';

import { Company, Maybe } from '@/generated/graphql';
import { Avatar } from '@/shared-components/avatar';

type FollowedCompanyProps = {
	company: Maybe<Company> | undefined;
};
const FollowedCompany = (props: FollowedCompanyProps) => {
	const { company } = props;
	return (
		<>
			{company ? (
				<Link href={`/brand/${company.id}`} passHref>
					<div className='flex flex-col items-center p-2 rounded-md shadow-lg'>
						<div className='flex h-40 overflow-hidden rounded-md w-40'>
							<Avatar
								imgSrc={company.avatar}
								name={company.name || company.legalName || ''}
								alt={company.name || company.legalName || ''}
								size='lg'
							/>
						</div>
						<div className='flex flex-col mb-0 mt-2 pl-4 w-full'>
							<span className='font-medium'>{company.legalName}</span>
							<span className='text-slate-400 text-sm'>{company.followers || 0} followers</span>
							<div className='flex gap-4 mt-4 w-full'>
								<Link href={`/brand/${company.id}/products`} passHref className='w-full'>
									<button className='bg-primary px-4 py-2 rounded-sm shadow-xl text-white'>Products</button>
								</Link>
								<Link href={`/brand/${company.id}/feeds`} passHref className='w-full'>
									<button className='bg-brandSecondary px-4 py-2 rounded-sm shadow-xl text-white'>
										Feeds
									</button>
								</Link>
							</div>
						</div>
					</div>
				</Link>
			) : (
				<p>No any followed companies</p>
			)}
		</>
	);
};

export default FollowedCompany;
