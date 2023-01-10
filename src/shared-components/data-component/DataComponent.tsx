import React, { useCallback } from 'react';

import { EmptyComponent } from '@/ui-elements/atoms/empty-component';

type DataComponentProps = {
	data: any;
	children: React.ReactNode;
	fallback?: React.ReactNode;
	emptyComponent?: React.ReactNode;
};

export const DataComponent = (props: DataComponentProps) => {
	const { children, data, emptyComponent = <EmptyComponent /> } = props;
	const render = useCallback(() => {
		return data?.length > 0 ? children : emptyComponent;
	}, [children, data?.length, emptyComponent]);
	return <>{render()}</>;
};
