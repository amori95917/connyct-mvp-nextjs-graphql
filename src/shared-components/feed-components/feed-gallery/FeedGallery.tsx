import Image from 'next/image';

type FeedGalleryProps = {
	images: any;
};
export const FeedGallery = (props: FeedGalleryProps) => {
	const { images } = props;
	return (
		<div
			className='grid lg:grid-cols-2 xl:grid-cols-2'
			css={{
				'@media (min-width: 768px)': {
					gridTemplateColumns: 'repeat(2, 1fr)',
				},
				'@media (max-width: 767px)': {
					gridTemplateColumns: 'repeat(1, 1fr)',
				},
			}}
		>
			{images.slice(0, 3).map(image => (
				<Image key={image.id} src={image.imageURL} alt='brand-feed-image' width={400} height={200} />
			))}
			{images.length > 3 && (
				<div className='relative w-full'>
					<div className='backdrop-blur-2xl flex items-center'>
						<Image
							src={images[3].imageURL}
							alt='brand-feed-image bg-primary backdrop-blur-2xl'
							width={400}
							height={200}
						/>
						{/* <p className='flex font-bold h-full items-center justify-center text-2xl text-brandSecondary w-full'>
							View More
						</p> */}
					</div>
				</div>
			)}
		</div>
	);
};
