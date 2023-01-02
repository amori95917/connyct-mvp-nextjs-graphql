import Image from 'next/image';

type AvatarSize = 'sm' | 'md' | 'lg';

type AvatarProps = {
	as?: React.ElementType;
	imgSrc?: string | null;
	alt?: string;
	name: string; // To not break existing functionality I have made this optional but this will be required
	size?: AvatarSize;
	className?: string;
	wrapperClassName?: string;
	width?: number;
	height?: number;
};

// TODO: move this to helper
export function isCharacterALetter(char: string) {
	return /[a-zA-Z]/.test(char);
}

const dimension: Record<AvatarSize, number> = {
	sm: 34,
	md: 48,
	lg: 128,
};

const initialSize: Record<AvatarSize, string> = {
	sm: 'w-5 h-5',
	md: 'w-6 h-6',
	lg: 'w-16 h-16',
};

const Avatar = (props: AvatarProps) => {
	const {
		as = 'div',
		imgSrc,
		name,
		wrapperClassName = '',
		className = 'object-cover rounded-full',
		alt = 'avatar',
		width = 300,
		height = 300,
		size = 'md',
	} = props;
	const Element = as;
	let wrapperClasses = '';
	if (wrapperClassName) {
		wrapperClasses += wrapperClassName;
	}
	// const initial = name.charAt(0).toLocaleLowerCase();
	return (
		<Element className={wrapperClasses}>
			{imgSrc ? (
				<>
					<Image fill src={imgSrc} alt={alt} className={className} />
					<div className='absolute border border-[rgba(0,0,0,0.04)] inset-0 rounded-full' />
				</>
			) : (
				<div className='grid'>
					<div className='col-end-1 col-start-1 flex row-end-1 row-start-1'>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={`/api/avatar?name=${encodeURIComponent(name)}`}
							alt={name}
							width={dimension[size]}
							height={dimension[size]}
						/>
					</div>
				</div>
			)}
		</Element>
	);
};

export default Avatar;

Avatar.displayName = 'Avatar';
