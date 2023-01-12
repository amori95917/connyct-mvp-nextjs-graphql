import { ListView } from '@/shared-components/view/list-view';
import { Button } from '@/ui-elements/atoms/button';

type EvangelistProps = {
	item: any;
};

const Evangelist = (props: EvangelistProps) => {
	const { item } = props;
	return (
		<>
			<ListView
				data={{
					title: item.fullName,
					metaTitle: item.username,
					avatar: item.userProfile?.profileImage || '',
				}}
				renderActions={() => {
					return (
						<>
							<Button>Connect</Button>
						</>
					);
				}}
			/>
		</>
	);
};

export default Evangelist;
