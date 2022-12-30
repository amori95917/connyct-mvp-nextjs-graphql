import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { UilAngleDown } from '@iconscout/react-unicons';

import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { GET_TAGS } from '@/graphql/tags';
import { BRAND_ROUTES } from '@/constants/routes';
import { EmptyComponent } from 'src/ui-elements/atoms/empty-component';

const TrendingTopics = () => {
	const { data, loading } = useQuery(GET_TAGS);
	return (
		<div className='bg-white grow overflow-hidden pb-4 rounded-md'>
			<p className='font-bold mt-2 pl-5 text-xl'>Trending Topics</p>
			<div className='bg-slate-300 h-px ml-5 mr-5 mt-3'></div>
			<LoaderDataComponent
				isLoading={loading}
				data={data?.getTags?.nodes}
				emptyComponent={<EmptyComponent text='No tags found' />}
			>
				{data?.getTags?.nodes.map(hashTag => {
					return (
						<Link
							key={hashTag.id}
							href={BRAND_ROUTES.FEEDS_BY_HASHTAGS(hashTag.name)}
							className='cursor-pointer'
							passHref
						>
							<div key={hashTag.id}>
								<p className='flex ml-5 mt-2'>
									{/* <span className='font-semibold'>Zara- </span> */}
									<span className='bg-gray-200 font-semibold h-7 inline-block mb-2 mr-2 px-3 py-1 rounded-full text-gray-800 text-sm'>
										#{hashTag.name}
									</span>
								</p>
								{/* <p className='-mt-2 flex items-center pl-5 pr-5 text-slate-400 text-sm w-full'>
										<GoPrimitiveDot /> {hashTag.totalPost} posts
									</p> */}
							</div>
						</Link>
					);
				})}
				<button className='flex font-semibold items-center ml-5 mt-3 text-primary'>
					<span className='flex items-center mr-1'>Read more</span> <UilAngleDown />
				</button>
			</LoaderDataComponent>
		</div>
	);
};

export default TrendingTopics;
