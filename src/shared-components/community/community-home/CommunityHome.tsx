import { Feed } from '@/shared-components/feeds/Feed';

import CreatePost from '@/shared-components/create-post/CreatePost';

const postButtonClassName =
	'bg-gray-200 flex justify-around p-2 rounded-full w-32 hover:bg-gray-300';

const demoData = {
	__typename: 'Post',
	id: '788c7cd0-29b8-48a7-8d1b-d4dce82e7658',
	text: 'testttt',
	companyId: '5b37e666-86de-42bb-86b5-6a09f1e48574',
	createdAt: '2022-11-30T16:25:04.552Z',
	comments: [],
	tags: [],
	creator: {
		__typename: 'User',
		id: '4c7379e1-1894-42d5-b90b-31b5b48f540c',
		fullName: 'joseff regmi',
		email: 'floweer@gmail.com',
	},
	company: {
		__typename: 'Company',
		id: '5b37e666-86de-42bb-86b5-6a09f1e48574',
		legalName: 'Flower tech pvt ltdddd',
		name: 'joseff',
	},
};

const CommunityHome = () => {
	return (
		<div>
			<div className='flex'>
				<div className='flex flex-col gap-4 w-3/5'>
					<div>
						<CreatePost />
					</div>
					<Feed post={demoData} name={''} isOnSale={false} />
				</div>
				<div className='flex flex-col gap-4 ml-4 w-2/5'>
					{/* About */}
					<div className='bg-white p-4 rounded-md'>
						<span className='font-bold text-2xl'>About</span>
						<p className='py-1 text-slate-500'>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam obcaecati blanditiis ducimus
							tempore aliquid dolores? Sed debitis consectetur esse adipisci?
						</p>
					</div>
					<div className='bg-white p-4 rounded-md'>
						<span className='font-bold text-2xl'>Trending Topics</span>
						<div className='flex flex-col gap-4 py-5'>
							<div className='flex flex-col'>
								<span className='text-xl'>#tag1</span>
								<span>100 posts</span>
							</div>
							<div className='flex flex-col'>
								<span className='text-xl'>#tag1</span>
								<span>100 posts</span>
							</div>
							<div className='flex flex-col'>
								<span className='text-xl'>#tag1</span>
								<span>100 posts</span>
							</div>
							<div className='flex flex-col'>
								<span className='text-xl'>#tag1</span>
								<span>100 posts</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default CommunityHome;
