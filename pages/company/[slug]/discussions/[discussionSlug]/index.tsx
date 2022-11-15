import DiscussionByID from '@/components/brand/community/each-discussion';
import BrandMenusLayout from 'app/layout';

export const EachDiscussion = () => {
	return (
		<>
			<BrandMenusLayout>
				<DiscussionByID />
			</BrandMenusLayout>
		</>
	);
};
EachDiscussion.auth = true;
export default EachDiscussion;
