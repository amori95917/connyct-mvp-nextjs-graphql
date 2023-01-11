type ListCommonProps = {
	children: React.ReactNode;
};

type ListProps = {
	className?: string;
} & ListCommonProps;

export const List = (props: ListProps) => {
	const { className = '', children } = props;
	return <div className={className}>{children}</div>;
};

export const Title = (props: ListCommonProps) => {
	const { children } = props;
	return <>{children}</>;
};
export const Meta = (props: ListCommonProps) => {
	const { children } = props;
	return <>{children}</>;
};

// may be call Avatar component here
export const Avatar = (props: ListCommonProps) => {
	const { children } = props;
	return <>{children}</>;
};

export const Actions = (props: ListCommonProps) => {
	const { children } = props;
	return <>{children}</>;
};

List.Title = Title;
List.Meta = Meta;
List.Avatar = Avatar;
List.Actions = Actions;
