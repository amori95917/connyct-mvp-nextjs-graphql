import NextImage from 'next/image';
import React from 'react';

type MasonryGalleryProps = {
	items: [];
	columns?: number;
	gap?: string;
	orderPrecedence?: string[];
	srcKey?: string;
	altKey?: string;
	itemKey?: string;
};

const MasonryGallery: React.FC<MasonryGalleryProps> = ({
	items,
	columns = 3,
	gap = '1rem',
	orderPrecedence = [],
	srcKey = 'src',
	altKey = 'alt',
	itemKey = 'src',
}) => {
	const [imageDimensions, setImageDimensions] = React.useState([]);
	const calculateImageDimensions = image => {
		const imageElement = new Image();
		imageElement.src = image[srcKey];

		return new Promise(resolve => {
			imageElement.onload = () => {
				console.log('naturalWidth', imageElement);
				const width = imageElement.naturalWidth;
				const height = imageElement.naturalHeight;
				console.log('width', width, height);
				resolve({ width, height });
			};
		});
	};

	React.useEffect(() => {
		const dimensionsPromises = items.map(image => calculateImageDimensions(image));
		Promise.all(dimensionsPromises).then(dimensions => setImageDimensions(dimensions));
	}, [items]);

	const style = {
		display: 'grid',
		gridTemplateColumns: `repeat(${columns}, 1fr)`,
		gridGap: gap,
	};

	if (imageDimensions.length === 0) {
		return <p>Loading...</p>;
	} else {
		return (
			<div style={style}>
				{items.map((image, index) => {
					const { width, height } = imageDimensions[index];
					const ratio = width / height;
					let widthClass = '';
					let heightClass = '';
					if (ratio >= 1) {
						widthClass = 'w-1/2';
						heightClass = 'h-auto';
					} else {
						widthClass = 'w-auto';
						heightClass = 'h-1/2';
					}

					return (
						<div key={image[itemKey]} className={`image-block `}>
							<NextImage src={image[srcKey]} alt={image[altKey]} width='0' height='0' sizes='100vw' />
						</div>
					);
				})}
			</div>
		);
	}
};
export default MasonryGallery;
