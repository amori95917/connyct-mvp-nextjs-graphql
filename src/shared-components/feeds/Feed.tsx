import { useMemo, useState } from 'react';

import { Card } from '@/ui-elements/card';
import { CreatorContainer } from '../creator-container';
import CreateComment from './comments/CreateComment';
import { FeedActions } from '../feed-actions';
import Comments from './comments/Comments';
import { Dropdown } from './Dropdown';
import { FeedProps } from './types';
// import FeedGallery from './feed-gallery/FeedGallery';

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

	// const gallery = useMemo(() => {
	// 	return [
	// 		'https://i.pravatar.cc/?img=1',
	// 		'https://i.pravatar.cc/?img=2',
	// 		'https://i.pravatar.cc/?img=3',
	// 		'https://i.pravatar.cc/?img=4',
	// 		'https://i.pravatar.cc/?img=5',
	// 		'https://i.pravatar.cc/?img=6',
	// 	];
	// }, []);

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
							<CreatorContainer avatar={'https://i.pravatar.cc/'} fullName={name} createdAt={createdAt} />
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
