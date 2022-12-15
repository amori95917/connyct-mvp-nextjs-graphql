import { CommunityMember } from '@/generated/graphql';
import { ProfileCard } from '@/shared-components/profile-card';

type MemberProps = {
	data: CommunityMember;
};
const Member = (props: MemberProps) => {
	const { data } = props;
	return (
		<>
			<ProfileCard
				profileImage={data?.member?.userProfile?.profileImage ?? ''}
				name={data.member?.fullName || ''}
				role='Admin'
				info={data.member?.username || ''}
			/>
		</>
	);
};

export default Member;
