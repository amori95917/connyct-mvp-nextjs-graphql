import { gql } from '@apollo/client';

export const COMMUNITY_MEMBERS_FRAGMENT = gql`
	fragment CommunityMemberFragment on CommunityMemberPaginated {
		edges {
			cursor
			node {
				id
				createdAt
				updatedAt
				communityId
				invitedById
				memberId
			}
		}
		pageInfo {
			hasNextPage
			hasPreviousPage
			startCursor
			endCursor
		}
		totalCount
	}
`;

export const CREATE_COMMUNITY = gql`
	mutation companyCommunity($input: CommunityInput!, $profile: Upload!) {
		companyCommunity(input: $input, profile: $profile) {
			errors {
				message
				code
				statusCode
			}
			community {
				id
				createdAt
				updatedAt
				name
				description
				type
				profile
				companyId
				creatorId
				slug
				company {
					name
					id
				}
				user {
					id
				}
			}
		}
	}
`;

export const GET_COMMUNITY = gql`
	query getCommunity(
		$companyId: String!
		$before: String
		$after: String
		$first: Float
		$last: Float
		$order: OrderListCommunity
	) {
		getCommunity(
			companyId: $companyId
			before: $before
			after: $after
			first: $first
			last: $last
			order: $order
		) {
			community {
				edges {
					cursor
					node {
						id
						createdAt
						updatedAt
						name
						description
						type
						profile
						companyId
						creatorId
						slug
						company {
							id
							name
							legalName
						}
						createdBy {
							id
							fullName
						}
						members(
							before: $before
							after: $after
							first: $first
							last: $last
							order: { direction: desc, orderBy: createdAt }
						) {
							edges {
								cursor
								node {
									id
									createdAt
									updatedAt
									communityId
									invitedById
									memberId
								}
							}
							pageInfo {
								hasNextPage
								hasPreviousPage
								startCursor
								endCursor
							}
							totalCount
						}
						followersCount
						communityRole {
							id
							createdAt
							updatedAt
							role
							communityId
							userId
							user {
								id
								createdAt
								updatedAt
								fullName
								username
								email
								isValid
								isSuperuser
								confirm
								emailToken
								isEmailVerified
								company {
									id
									legalName
									name
								}
								userProfile {
									id
									profileImage
								}
								isAdmin
							}
						}
					}
				}
				pageInfo {
					hasNextPage
					hasPreviousPage
					startCursor
					endCursor
				}
				totalCount
			}
		}
	}
`;

export const GET_COMMUNITY_BY_ID = gql`
	query getCommunityById($communityId: String!) {
		getCommunityById(communityId: $communityId) {
			errors {
				message
				code
				statusCode
			}
			community {
				id
				name
				description
				type
				companyId
				profile
				slug
				followersCount
			}
		}
	}
`;

export const GET_COMMUNITY_MEMBERS = gql`
	query getCommunityMember(
		$companyId: String!
		$before: String
		$after: String
		$first: Float
		$last: Float
		$order: OrderListCommunityMember
	) {
		getCommunityMember(
			companyId: $companyId
			before: $before
			after: $after
			first: $first
			last: $last
			order: $order
		) {
			errors {
				message
				code
				statusCode
			}
			communityMember {
				...CommunityMemberFragment
			}
		}
	}
	${COMMUNITY_MEMBERS_FRAGMENT}
`;
