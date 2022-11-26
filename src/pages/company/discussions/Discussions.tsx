import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { ConferenceIcon } from '@/shared-components/icons';
import { EmptyComponent } from '@/ui-elements/atoms/empty-component';
import { DiscussionLayout } from '@/shared-components/layouts/discussion-layout/DiscussionLayout';
import { DiscussionsLoader } from '@/shared-components/skeleton-loader/DiscussionLoader';
import { useDiscussionsQuery } from '@/hooks/services/useDiscussionsQuery';
import { CompanyDiscussionEdge } from '@/generated/graphql';

import Discussion from './Discussion';
import { DiscussionForm } from './discussion-form';

const Discussions = ({ companySlug }: { companySlug: string }) => {
	const { discussions, loading } = useDiscussionsQuery(companySlug);
	return (
		<>
			<DiscussionLayout companySlug={companySlug} DiscussionForm={DiscussionForm}>
				<LoaderDataComponent
					isLoading={loading}
					data={discussions}
					fallback={<DiscussionsLoader />}
					emptyComponent={
						<EmptyComponent
							text='There are no discussion yet'
							subText='Please create a new discussion'
							icon={<ConferenceIcon width='4em' height='4em' className='fill-primary' />}
						/>
					}>
					{discussions.map((discussionNode: CompanyDiscussionEdge) => {
						const { node } = discussionNode;
						return <Discussion key={node?.id} discussion={node} companySlug={companySlug} />;
					})}
				</LoaderDataComponent>
			</DiscussionLayout>
		</>
	);
};

export default Discussions;
