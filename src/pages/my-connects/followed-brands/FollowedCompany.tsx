import Link from 'next/link';
import Image from 'next/image';

import { Company, Maybe } from '@/generated/graphql';

type FollowedCompanyProps = {
	company: Maybe<Company> | undefined;
};
const FollowedCompany = (props: FollowedCompanyProps) => {
	const { company } = props;
	return (
		<>
			{company ? (
				<Link href={`/brand/${company.id}`} passHref>
					<div className='flex flex-col items-center p-1 rounded-md shadow-lg'>
						<div className='flex h-52 overflow-hidden rounded-md w-40'>
							<Image width={144} height={144} src={`https://i.pravatar.cc`} alt='propic' />
						</div>
						<div className='flex flex-col mb-0 mt-2 pl-4 w-full'>
							<span className='font-medium'>{company.legalName}</span>
							<span className='text-slate-400 text-sm'>{company.followers || 0} followers</span>
							<div className='flex justify-between mt-4 w-full'>
								<button className='bg-gray-200 flex h-8 items-center p-2 rounded-md'>Unfollow</button>
								<button className='h-8 rounded-full shadow-xl w-8'>S</button>
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
