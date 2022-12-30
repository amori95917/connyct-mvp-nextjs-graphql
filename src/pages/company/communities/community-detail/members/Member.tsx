import { CommunityMember, User } from '@/generated/graphql';
import { ProfileCard } from '@/shared-components/profile-card';

type MemberProps = {
	data: CommunityMember;
	authorizedUser: User;
};
const Member = (props: MemberProps) => {
	const { data, authorizedUser } = props;
	return (
		<>
			<ProfileCard
				profileImage={data?.member?.userProfile?.profileImage ?? ''}
				name={data.member?.fullName || ''}
				role={data?.member?.isAdmin ? 'Admin' : 'Member'}
				info={data.member?.username || ''}
				userId={data.member?.id}
				authorizedUser={authorizedUser}
			/>
		</>
	);
};

export default Member;
