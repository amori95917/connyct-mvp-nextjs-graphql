import { useState } from 'react';

import { RightDrawerLayout } from '@/shared-components/layouts/right-drawer-layout';
import PolicyForm from '../PolicyForm';
import { useCommunityPoliciesQuery } from '@/hooks/services/useCommunityPolicy';
import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { EmptyComponent } from '@/ui-elements/atoms/empty-component';
import { ConferenceIcon } from '@/shared-components/icons';
import { CommunityPolicyEdge } from '@/generated/graphql';
import Policy from './Policy';

type PolicyProps = {
	communitySlug: string;
};

const Policies = (props: PolicyProps) => {
	const { communitySlug } = props;
	const { response, loading } = useCommunityPoliciesQuery(communitySlug);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const handleDrawerToggle = () => setIsDrawerOpen(!isDrawerOpen);
	const onDrawerClose = () => setIsDrawerOpen(false);
	return (
		<>
			{isDrawerOpen && (
				<RightDrawerLayout isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} drawerSize='md'>
					<PolicyForm communitySlug={communitySlug} onClose={onDrawerClose} />
				</RightDrawerLayout>
			)}
			<LoaderDataComponent
				isLoading={loading}
				data={response}
				emptyComponent={
					<EmptyComponent
						text='There are no policies yet'
						subText='No Rules Set Up Use rules to help set the tone for your group and help prevent member
						conflict. Write up to 10 rules about your group.'
						icon={<ConferenceIcon width='4em' height='4em' className='fill-primary' />}
						ctaButton={
							<>
								<button className='bg-primary mt-4 px-4 py-2 text-white' onClick={handleDrawerToggle}>
									Get Started
								</button>
							</>
						}
					/>
				}>
				{response.map((communityPolicyNode: CommunityPolicyEdge) => {
					const { node } = communityPolicyNode;
					if (node) {
						return (
							<div key={node?.id} className='mt-10'>
								<Policy data={node} communitySlug={communitySlug} />
							</div>
						);
					}
				})}
			</LoaderDataComponent>
		</>
	);
};

export default Policies;
