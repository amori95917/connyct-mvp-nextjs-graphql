import Link from 'next/link';
import Image from 'next/image';

import { Company, Maybe } from '@/generated/graphql';
import { Avatar } from '@/shared-components/avatar';
import { CardView } from '@/shared-components/view/card-view';

type FollowedCompanyProps = {
	company: Maybe<Company> | undefined;
};
const FollowedCompany = (props: FollowedCompanyProps) => {
	const { company } = props;
	return (
		<>
			{company ? (
				<Link href={`/brand/${company.id}`} passHref>
					<CardView
						avatar={{
							imgSrc: company.avatar,
							name: company.name || company.legalName || '',
							alt: company.name || company.legalName || '',
							size: 'lg',
						}}
						item={{
							title: company.legalName || '',
							metaTitle: `${company.followers || 0} followers`,
						}}
						renderActions={() => (
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
						)}
					/>
				</Link>
			) : (
				<p>No any followed companies</p>
			)}
		</>
	);
};

export default FollowedCompany;
