import { gql } from '@apollo/client';

export const FOLLOW_USER = gql`
	mutation followUserToUser($data: FollowUserToUserInput!) {
		followUserToUser(data: $data) {
			id
			createdAt
			updatedAt
			followedToId
			followedById
			isConnected
		}
	}
`;

export const UNFOLLOW_USER = gql`
	mutation unfollowUser($data: UnfollowUserInput!) {
		unfollowUser(data: $data) {
			status
		}
	}
`;
