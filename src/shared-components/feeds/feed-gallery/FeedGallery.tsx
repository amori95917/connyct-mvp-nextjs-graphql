import { useState, useCallback } from 'react';
import Image from 'next/image';
import ImageViewer from 'react-simple-image-viewer';

type FeedGalleryProps = {
	gallery: string[];
};

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

const FeedGallery = (props: FeedGalleryProps) => {
	const { gallery } = props;
	const [currentImage, setCurrentImage] = useState(0);
	const [isViewerOpen, setIsViewerOpen] = useState(false);

	const openImageViewer = useCallback((index: number) => {
		setCurrentImage(index);
		setIsViewerOpen(true);
	}, []);

	const closeImageViewer = () => {
		setCurrentImage(0);
		setIsViewerOpen(false);
	};

	return (
		<>
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

export default FeedGallery;
