import { Loader } from '@/components/atoms/loader';
import { EmptyComponent } from '@/components/atoms/empty-component';

type LoaderDataComponentProps = {
	isLoading: boolean;
	data: any;
	children: React.ReactNode;
	emptyComponent?: React.ReactNode;
};

export const LoaderDataComponent: React.FC<LoaderDataComponentProps> = props => {
	const { isLoading, data, children, emptyComponent } = props;
	if (isLoading) return <Loader />;
	// if (!data) return 'No data';
	if (!data?.length) return emptyComponent || <EmptyComponent />;
	return <>{children}</>;
};
