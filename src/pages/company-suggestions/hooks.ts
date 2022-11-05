import { useState, useEffect } from 'react';

import { FOLLOW_COMPANY, UNFOLLOW_COMPANY } from '@/graphql/follow-company';
import { useMutation } from '@apollo/client';

const useCompanySuggestion = () => {
	const [followedCompanies, setFollowedCompanies] = useState<string[]>([]);
	const [followCompany] = useMutation(FOLLOW_COMPANY);
	const [unfollowCompany] = useMutation(UNFOLLOW_COMPANY);

	const onFollow = async (companyId: string) => {
		const response = await followCompany({
			variables: {
				data: {
					followedToId: companyId,
				},
			},
		});
		const followedCompanyId = response.data.followCompany.followedToId;
		if (!followedCompanies.includes(followedCompanyId)) {
			setFollowedCompanies([...followedCompanies, followedCompanyId]);
		} else setFollowedCompanies(followedCompanies.filter(item => item != followedCompanyId));
	};

	const onUnfollow = async (companyId: string) => {
		await unfollowCompany({
			variables: {
				data: {
					companyId,
				},
			},
		});
		setFollowedCompanies(followedCompanies.filter(item => item != companyId));
	};

	const onContinue = () => {
		location.href = `/feeds`;
	};

	const onSkip = () => {
		location.href = `/feeds`;
	};

	return {
		followedCompanies,
		onFollow,
		onUnfollow,
		onContinue,
		onSkip,
	};
};

export default useCompanySuggestion;
