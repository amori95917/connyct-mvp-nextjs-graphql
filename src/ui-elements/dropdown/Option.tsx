import { OptionProps } from './types';

export const Option = (props: OptionProps) => {
	const { children, ...rest } = props;
	return <>{children}</>;
};
