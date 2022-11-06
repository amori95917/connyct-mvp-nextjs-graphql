import { TextProps } from './types';

export const Text = (props: TextProps) => {
	const { type, children, ...rest } = props;
	return <>{children}</>;
};
