import Image from 'next/image';
import Link from 'next/link';
import { formatDistance } from 'date-fns';

import { HashTag } from '@/shared-components/hash-tag';

type FeedProps = {
	name: string;
	gallery: string[];
	text: string;
	tags: any;
	createdAt: Date;
	companyId: string;
};

type TagProps = {
	id: string;
	name: string;
};

const Feed = (props: FeedProps) => {
	const { name, gallery, text, tags, createdAt, companyId } = props;
	return (
		<>
			<div className='px-6 py-4'>
				<Link href={`/brand/${companyId}`} passHref>
					<div className='cursor-pointer flex items-center justify-start'>
						<div className='h-12 relative rounded-full w-12'>
							<Image
								src='https://i.pravatar.cc/200'
								alt={name}
								className='rounded-full'
								width='400'
								height='400'
							/>
						</div>
						<div className='company-name pl-4'>
							<div className='font-bold text-xl'>{name}</div>
							<p className='text-gray-400 text-xs'>
								{formatDistance(new Date(createdAt), new Date(), { addSuffix: true })}
							</p>
						</div>
					</div>
				</Link>

				<p className='py-4 text-base text-gray-700'>{text}</p>
				{/* gallery && <PostImageSingle gallery={gallery} /> */}
			</div>
			{tags && (
				<div className='px-6'>
					{tags.map((tag: TagProps) => {
						return <HashTag key={tag.id} text={tag.name} />;
					})}
				</div>
			)}
		</>
	);
};

export default Feed;
