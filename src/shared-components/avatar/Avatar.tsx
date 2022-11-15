import Image from 'next/image';

type AvatarProps = {
	as?: React.ElementType;
	imgSrc: string;
	alt?: string;
	className?: string;
	wrapperClassName?: string;
	width?: number;
	height?: number;
};

const Avatar = (props: AvatarProps) => {
	const {
		as = 'div',
		imgSrc,
		wrapperClassName = '',
		className = '',
		alt = 'avatar',
		width = 300,
		height = 300,
	} = props;
	const Element = as;
	return (
		<Element className={wrapperClassName}>
			<Image width={width} height={height} src={imgSrc} alt={alt} className={className} />
		</Element>
	);
};

export default Avatar;

Avatar.displayName = 'Avatar';
