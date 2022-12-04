import { useMemo, useState } from 'react';
import Image from 'next/image';
import { formatDistance } from 'date-fns';
import { FeedProps } from './types';
import { Dropdown } from './Dropdown';

import { Card } from '@/ui-elements/card';
import { FeedActions } from '../feed-actions';
import CreateComment from './comments/CreateComment';
import Comments from './comments/Comments';
import FeedGallery from './feed-gallery/FeedGallery';

export const Feed: React.FC<FeedProps> = props => {
	const { post, isOnSale, name } = props;

	const {
		tags = [],
		postImage,
		// gallery = demoGa,
		text = '',
		comments = [],
		id,
		createdAt,
		companyId,
	} = post;
	// const { data: likesData } = useQuery(GET_REACTIONS_POST, {
	// 	variables: { postId: id },
	// });

	const gallery = useMemo(() => {
		return [
			'https://i.pravatar.cc/?img=1',
			'https://i.pravatar.cc/?img=2',
			'https://i.pravatar.cc/?img=3',
			'https://i.pravatar.cc/?img=4',
			'https://i.pravatar.cc/?img=5',
			'https://i.pravatar.cc/?img=6',
		];
	}, []);

	const [showCommentSection, setShowCommentSection] = useState(false);
	const onCommentClickHandler = () => {
		setShowCommentSection(!showCommentSection);
	};

	return (
		<>
			{companyId && (
				<div className='bg-white mt-5 p-3 rounded-md'>
					<Card>
						<div className='flex justify-between'>
							<div className='flex items-center'>
								<Card.Avatar>
									<div>
										<Image
											src={'https://i.pravatar.cc/'}
											height={40}
											width={40}
											className={'rounded-full'}
											alt={'Image'}
										/>
									</div>
								</Card.Avatar>
								<div className='flex flex-col ml-2'>
									<Card.Text type='title'>
										<span className='font-bold text-xl'>{name}</span>
									</Card.Text>
									<Card.Text type='faded'>
										<span className='text-gray-400'>
											{formatDistance(new Date(createdAt), new Date(), { addSuffix: true })}
										</span>
									</Card.Text>
								</div>
							</div>
							<Card.Action>
								<Dropdown />
							</Card.Action>
						</div>
						<div className='ml-12 mt-4'>
							<Card.Text type='description'>{text}</Card.Text>
						</div>

						{/* <Card.Image>
							<FeedGallery gallery={gallery} />
						</Card.Image> */}
					</Card>
					<div className='ml-10 mt-6'>
						<FeedActions
							postId={id}
							likesData={[]}
							commentLength={comments.length}
							isOnSale={isOnSale}
							onCommentClickHandler={onCommentClickHandler}
						/>
						{showCommentSection && (
							<>
								<CreateComment postId={id} />
								{comments.length ? (
									<div className='max-h-96 no-scrollbar overflow-y-scroll pt-6'>
										<Comments postId={id} />
									</div>
								) : null}
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
};
