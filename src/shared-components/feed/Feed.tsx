type FeedProps = {
	className?: string;
	children: React.ReactNode;
};

export const Feed = (props: FeedProps) => {
	const { className = '', children } = props;
	return (
		<>
			<div className={className}>{children}</div>
		</>
	);
};

type FeedCreatorProfileProps = {
	children: React.ReactNode;
};

export const CreatorProfile = (props: FeedCreatorProfileProps) => {
	const { children } = props;
	return <>{children}</>;
};

type FeedTitleProps = {
	children: React.ReactNode;
};

export const Title = (props: FeedTitleProps) => {
	const { children } = props;
	return <>{children}</>;
};

type FeedDescriptionProps = {
	children: React.ReactNode;
};

export const Description = (props: FeedDescriptionProps) => {
	const { children } = props;
	return <>{children}</>;
};

type FeedGalleryProps = {
	children: React.ReactNode;
};

export const Gallery = (props: FeedGalleryProps) => {
	const { children } = props;
	return <>{children}</>;
};

Feed.CreatorProfile = CreatorProfile;
Feed.Title = Title;
Feed.Description = Description;
Feed.Gallery = Gallery;
