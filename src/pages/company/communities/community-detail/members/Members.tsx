import { useState } from 'react';

import { Input } from '@/ui-elements/atoms/forms/input';
import { useCommunityMembers } from '@/hooks/services/useCommunityMembers';
import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { EmptyComponent } from '@/ui-elements/atoms/empty-component';
import { ConferenceIcon } from '@/shared-components/icons';
import { CommunityMemberEdge } from '@/generated/graphql';
import { RightDrawerLayout } from '@/shared-components/layouts/right-drawer-layout';
import Member from './Member';
import { InviteMembers } from '../../invite-memers';

type CommunityMemberProps = {
	communitySlug: string;
};

export const CommunityMembers = (props: CommunityMemberProps) => {
	const { communitySlug } = props;
	const { response, loading, totalCount } = useCommunityMembers(communitySlug);
	const [isInviteDrawerOpen, setIsInviteDrawerOpen] = useState(false);
	const handleInviteDrawerToggle = () => setIsInviteDrawerOpen(!isInviteDrawerOpen);

	return (
		<>
			{isInviteDrawerOpen && (
				<RightDrawerLayout
					isOpen={isInviteDrawerOpen}
					setIsOpen={setIsInviteDrawerOpen}
					drawerSize='xl'>
					<InviteMembers />
				</RightDrawerLayout>
			)}
			<div className='bg-white gap-4 p-5 rounded-md w-4/5'>
				<span className='font-bold py-3 text-xl'>Members - {totalCount}</span>
				<div className='py-4'>
					<Input id='member' name='member' placeholder='Find a member' />
				</div>
				<hr className='bg-gray-200 border-0 h-px mb-4 pl-10 dark:bg-gray-700' />
				<LoaderDataComponent
					isLoading={loading}
					data={response}
					emptyComponent={
						<EmptyComponent
							text='There are no members yet'
							subText=''
							icon={<ConferenceIcon width='4em' height='4em' className='fill-primary' />}
							ctaButton={
								<>
									<button
										className='bg-primary mt-4 px-4 py-2 text-white'
										onClick={handleInviteDrawerToggle}>
										Invite Members
									</button>
								</>
							}
						/>
					}>
					{response.map((communityMemberNode: CommunityMemberEdge) => {
						const { node } = communityMemberNode;
						if (node) {
							return <Member data={node} key={node?.id} />;
						}
					})}
				</LoaderDataComponent>
				{/* <div>
					<span className='font-bold py-3 text-lg'>Admins & moderators &bull;8</span>
					<ProfileCard
						profileImage='https://i.pravatar.cc'
						name='Kiran Budhathoki'
						role='Admin'
						info='This is me'
					/>
					<ProfileCard
						profileImage='https://i.pravatar.cc'
						name='Kiran Budhathoki'
						role='Admin'
						info='This is me'
					/>
					<ProfileCard
						profileImage='https://i.pravatar.cc'
						name='Kiran Budhathoki'
						role='Admin'
						info='This is me'
					/>
				</div> */}
				<hr className='bg-gray-200 border-0 h-px mb-4 pl-10 dark:bg-gray-700' />
				{/* <div>
					<span className='font-bold py-3 text-lg'>Members &bull;8</span>
					<ProfileCard
						profileImage='https://i.pravatar.cc'
						name='Kiran Budhathoki'
						role='Admin'
						info='This is me'
					/>
					<ProfileCard
						profileImage='https://i.pravatar.cc'
						name='Kiran Budhathoki'
						role='Admin'
						info='This is me'
					/>
					<ProfileCard
						profileImage='https://i.pravatar.cc'
						name='Kiran Budhathoki'
						role='Admin'
						info='This is me'
					/>
				</div> */}
			</div>
		</>
	);
};
export default CommunityMembers;
