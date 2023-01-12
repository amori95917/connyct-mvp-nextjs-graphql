import { Button } from '@/ui-elements/atoms/button';
import { ListView } from '../view/list-view';

type StaffProps = {
	item: any;
	handleShowMessagePopup?: () => void;
};

const Staff = (props: StaffProps) => {
	const { item, handleShowMessagePopup } = props;
	const handleMessagePopup = () => {
		// handleShowMessagePopup();
		console.log('show popup');
	};
	return (
		<>
			<div className='pb-4'>
				<ListView
					data={{
						title: item.fullName,
						metaTitle: item.username,
						avatar: item.userProfile?.profileImage || '',
					}}
					renderActions={() => {
						return <>{item.role === 'STAFF' && <Button onClick={handleMessagePopup}>Message</Button>}</>;
					}}
				/>
			</div>
		</>
	);
};

export default Staff;
