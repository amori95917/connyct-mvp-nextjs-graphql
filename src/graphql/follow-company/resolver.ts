import { gql } from '@apollo/client';

export const FOLLOW_COMPANY = gql`
	mutation followCompany($data: FollowCompanyInput!) {
		followCompany(data: $data) {
			followedToId
		}
	}
`;

export const UNFOLLOW_COMPANY = gql`
	mutation unfollowCompany($data: UnfollowCompanyInput!) {
		unfollowCompany(data: $data)
	}
`;
