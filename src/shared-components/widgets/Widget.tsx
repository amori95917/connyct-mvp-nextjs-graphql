import { Box } from '@/ui-elements/atoms/box';

type WidgetProps = {
	children: React.ReactNode;
	widgetClassName?: string;
};

const Widget = (props: WidgetProps) => {
	const { children, widgetClassName = '' } = props;
	return (
		<>
			<Box className={widgetClassName}>{children}</Box>
		</>
	);
};

export default Widget;
