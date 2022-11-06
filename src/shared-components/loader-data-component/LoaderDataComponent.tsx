import React, { useCallback } from 'react';

import { EmptyComponent } from '@/ui-elements/atoms/empty-component';
import { Loader } from '@/ui-elements/atoms/loader';

type LoaderDataComponentProps = {
	isLoading?: boolean;
	data: any;
	children: React.ReactNode;
	fallback?: React.ReactNode;
	emptyComponent?: React.ReactNode;
	isSuspense?: boolean;
};

export const LoaderDataComponent = (props: LoaderDataComponentProps) => {
	const {
		isLoading,
		fallback = <Loader />,
		children,
		data,
		emptyComponent = <EmptyComponent />,
		isSuspense = false,
	} = props;
	const render = useCallback(() => {
		return data?.length ? children : emptyComponent;
	}, [children, data?.length, emptyComponent]);
	if (isLoading) return <>{fallback}</>;
	if (isSuspense) {
		return <React.Suspense fallback={fallback}>{render()}</React.Suspense>;
	} else {
		return <>{render()}</>;
	}
};
