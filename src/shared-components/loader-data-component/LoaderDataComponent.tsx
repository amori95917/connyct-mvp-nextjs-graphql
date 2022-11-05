import React from 'react';

import { EmptyComponent } from '@/components/atoms/empty-component';
import { Loader } from '@/components/atoms/loader';

type LoaderDataComponentProps = {
	isLoading?: boolean;
	data: any;
	children: React.ReactNode;
	fallback?: React.ReactNode;
};

export const LoaderDataComponent: React.FC<LoaderDataComponentProps> = props => {
	const { isLoading, fallback = <Loader />, children, data } = props;
	if (isLoading) return fallback;
	return (
		<React.Suspense fallback={fallback}>
			{data?.length ? children : <EmptyComponent />}
		</React.Suspense>
	);
};
