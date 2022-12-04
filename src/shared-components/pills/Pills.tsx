import React from 'react';

type PillsProps = {
	children: React.ReactNode;
	as?: React.ElementType;
};

type PillsTextProps = {
	children: React.ReactNode;
};

export const Pills = (props: PillsProps) => {
	const { children, as = 'div', ...rest } = props;
	const Component = as;
	return (
		<Component
			{...rest}
			className='bg-gray-200 duration-150 ease-in-out font-medium inline-block leading-tight my-2 px-6 py-2.5 rounded-full shadow-md text-gray-700 text-xs transition uppercase hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:outline-none focus:ring-0 focus:shadow-lg active:bg-gray-400 active:shadow-lg'>
			{children}
		</Component>
	);
};

Pills.displayName = 'Pills';

export const PillsText = (props: PillsTextProps) => {
	const { children } = props;
	return <>{children}</>;
};

Pills.Text = PillsText;
