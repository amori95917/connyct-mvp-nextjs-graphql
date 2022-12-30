import { useDiscussionQueryById } from '@/hooks/services/useDiscussionQueryById';
import { ConferenceIcon } from '@/shared-components/icons';
import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { EmptyComponent } from '@/ui-elements/atoms/empty-component';

import { DiscussionView } from './DiscussionView';

import { DiscussionViewLoader } from '@/shared-components/skeleton-loader/DiscussionViewLoader';

export const DiscussionDetail = ({
	companySlug,
	discussionSlug,
}: {
	companySlug: string;
	discussionSlug: string;
}) => {
	const { discussion, loading } = useDiscussionQueryById(discussionSlug);

	return (
		<LoaderDataComponent
			isLoading={loading}
			data={discussion ? [discussion] : null}
			fallback={<DiscussionViewLoader />}
			emptyComponent={
				<EmptyComponent
					text='Discussion Not Found'
					subText='Please create a new discussion'
					icon={<ConferenceIcon width='4em' height='4em' className='fill-primary' />}
				/>
			}
		>
			<DiscussionView discussion={discussion} />
			{/* <DiscussionViewLoader /> */}
		</LoaderDataComponent>
	);
};
