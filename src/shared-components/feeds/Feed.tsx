import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import { formatDistance } from 'date-fns';
import { FeedProps } from './types';
import { Dropdown } from './Dropdown';
import ImageViewer from 'react-simple-image-viewer';

import { Card } from '@/ui-elements/card';
import { FeedActions } from '../feed-actions';
import CreateComment from './comments/CreateComment';
import Comments from './comments/Comments';
import { GET_REACTIONS_POST } from '@/graphql/feeds';
import { useQuery } from '@apollo/client';

const getClassName = (index: number) => {
	if (index == 0) return 'col-span-3 ';
	if (index == 3) return ' relative';
	return '';
};

const getImageClassName = (index: number) => {
	if (index == 3) return 'low_image_brightness ';
	return '';
};

const getClassName3 = (index: number) => {
	if (index == 0) return 'col-span-2 row-span-2';
	if (index == 1) return ' row-span-1';
	if (index == 2) return 'row-span-1 ';
};

export const Feed: React.FC<FeedProps> = props => {
	const { post, isOnSale, name } = props;

	const [currentImage, setCurrentImage] = useState(0);
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const {
		tags = [],
		postImage,
		// gallery = demoGa,
		text = '',
		comments = [],
		id,
		createdAt,
		companyId,
	} = post ?? {};
	const { data: likesData } = useQuery(GET_REACTIONS_POST, {
		variables: { postId: id },
	});

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

	console.log(currentImage);

	const [showCommentSection, setShowCommentSection] = useState(false);
	const onCommentClickHandler = () => {
		setShowCommentSection(!showCommentSection);
	};

	const openImageViewer = useCallback(index => {
		setCurrentImage(index);
		setIsViewerOpen(true);
	}, []);

	const closeImageViewer = () => {
		setCurrentImage(0);
		setIsViewerOpen(false);
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
						<div>
							<Card.Text type='description'>{text}</Card.Text>{' '}
						</div>

						<Card.Image>
							{gallery?.length > 0 && (
								<div className='flex space-x-3'>
									{gallery.length === 1 && (
										<div className='flex h-auto relative w-full'>
											<Image
												placeholder='blur'
												className='rounded-md'
												src={gallery[0]}
												width={400}
												height={400}
												alt='Image'
												onClick={() => openImageViewer(0)}
											/>
										</div>
									)}
									{gallery.length === 2 &&
										gallery.map((img, index) => {
											return (
												<div key={index} className='w-1/2'>
													<div key={index} className='flex h-full relative w-full'>
														<Image
															placeholder='blur'
															className='cursor-pointer rounded-md'
															src={img}
															width={400}
															height={400}
															alt='Image'
															onClick={() => openImageViewer(index)}
														/>
													</div>
												</div>
											);
										})}
									{gallery.length === 3 && (
										<div className='gap-3 grid grid-rows-3'>
											{gallery.map((img, index) => {
												return (
													<Image
														placeholder='blur'
														key={index}
														className={`${getClassName3(index)} rounded-md cursor-pointer`}
														src={img}
														width={400}
														height={400}
														alt='Image'
														onClick={() => openImageViewer(index)}
													/>
												);
											})}
										</div>
									)}
									{gallery.length === 4 && (
										<div className='gap-3 grid grid-cols-2'>
											{gallery.map((img, index) => {
												return (
													<Image
														placeholder='blur'
														key={index}
														className='cursor-pointer rounded-md'
														src={img}
														width={400}
														height={400}
														alt='Image'
														onClick={() => openImageViewer(index)}
													/>
												);
											})}
										</div>
									)}
									{gallery.length > 4 && (
										<div className='gap-3 grid grid-cols-3 justify-center'>
											{gallery.map((img, index) => {
												if (index < 4)
													return (
														<div
															key={index}
															onClick={() => openImageViewer(index)}
															className={`${getClassName(index)}`}>
															<Image
																key={index}
																className={`${getImageClassName(index)} rounded-md cursor-pointer`}
																src={img}
																width={400}
																height={400}
																alt='Image'
																onClick={() => openImageViewer(index)}
															/>
															{index === 3 && (
																<p className='absolute flex h-full items-center justify-center text-3xl text-white top-0 w-full'>
																	+{gallery.length - 4}
																</p>
															)}
														</div>
													);
											})}
										</div>
									)}
								</div>
							)}
						</Card.Image>
					</Card>
					<div className='p-5'>
						<FeedActions
							postId={id}
							likesData={likesData}
							commentLength={comments.length}
							isOnSale={isOnSale}
							onCommentClickHandler={onCommentClickHandler}
						/>
						{showCommentSection && (
							<>
								<CreateComment postId={id} />
								<div className='max-h-96 no-scrollbar overflow-y-scroll pt-6'>
									<Comments postId={id} />
								</div>
							</>
						)}
					</div>
				</div>
			)}

			{isViewerOpen && (
				<ImageViewer
					src={gallery}
					currentIndex={currentImage}
					disableScroll={true}
					closeOnClickOutside={true}
					onClose={closeImageViewer}
				/>
			)}
		</>
	);
};
