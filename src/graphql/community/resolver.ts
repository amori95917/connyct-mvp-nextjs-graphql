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
				member {
					id
					fullName
					username
					email
					isAdmin
					userProfile {
						id
						profileImage
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
`;

export const COMMUNITY_POLICY_FRAGMENT = gql`
	fragment CommunityPolicyFragment on CommunityPolicy {
		id
		createdAt
		updatedAt
		communityId
		title
		description
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
			}
		}
	}
`;

export const GET_COMMUNITIES = gql`
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
						coverImage
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

export const GET_COMMUNITIES_BY_ID = gql`
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
				coverImage
				slug
				followersCount
			}
		}
	}
`;

export const GET_COMMUNITIES_MEMBERS = gql`
	query getCommunityMember(
		$communityId: String!
		$before: String
		$after: String
		$first: Float
		$last: Float
		$order: OrderListCommunityMember
	) {
		getCommunityMember(
			communityId: $communityId
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

export const EDIT_COMMUNITY = gql`
	mutation companyCommunityEdit(
		$communityId: String!
		$input: CommunityEditInput!
		$profile: Upload
		$coverImage: Upload
	) {
		companyCommunityEdit(
			communityId: $communityId
			input: $input
			profile: $profile
			coverImage: $coverImage
		) {
			errors {
				message
				code
				statusCode
			}
			community {
				id
				name
				slug
				profile
				coverImage
				type
				description
			}
		}
	}
`;

export const COMMUNITY_POLICIES = gql`
	query getCommunityPolicies(
		$communityId: String!
		$before: String
		$after: String
		$first: Float
		$last: Float
	) {
		getCommunityPolicies(
			communityId: $communityId
			before: $before
			after: $after
			first: $first
			last: $last
		) {
			errors {
				message
				code
				statusCode
			}
			data {
				edges {
					cursor
					node {
						...CommunityPolicyFragment
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
	${COMMUNITY_POLICY_FRAGMENT}
`;

export const COMMUNITY_POLICY = gql`
	query getCommunityPolicy($id: String!) {
		getCommunityPolicy(id: $id) {
			...CommunityPolicyFragment
		}
	}
	${COMMUNITY_POLICY_FRAGMENT}
`;

export const CREATE_COMMUNITY_POLICY = gql`
	mutation createCommunityPolicy($id: String!, $input: CommunityPolicyInput!) {
		createCommunityPolicy(id: $id, input: $input) {
			errors {
				message
				code
				statusCode
			}
			data {
				...CommunityPolicyFragment
			}
		}
	}
	${COMMUNITY_POLICY_FRAGMENT}
`;

export const UPDATE_COMMUNITY_POLICY = gql`
	mutation updateCommunityPolicy($id: String!, $input: CommunityPolicyUpdateInput!) {
		updateCommunityPolicy(id: $id, input: $input) {
			errors {
				message
				code
				statusCode
			}
			data {
				...CommunityPolicyFragment
			}
		}
	}
	${COMMUNITY_POLICY_FRAGMENT}
`;

export const DELETE_COMMUNITY_POLICY = gql`
	mutation deleteCommunityPolicy($id: String!) {
		deleteCommunityPolicy(id: $id) {
			errors {
				message
				code
				statusCode
			}
			isDeleted
		}
	}
	${COMMUNITY_POLICY_FRAGMENT}
`;

export const COMMUNITY_FEEDS = gql`
	query communityPost(
		$communityId: String!
		$before: String
		$after: String
		$first: Float
		$last: Float
	) {
		communityPost(
			communityId: $communityId
			before: $before
			after: $after
			first: $first
			last: $last
		) {
			errors {
				message
				code
				statusCode
			}
			communityPost {
				edges {
					cursor
					node {
						id
						createdAt
						updatedAt
						text
						communityId
						slug
						isDeleted
						isApproved
						creator {
							id
							fullName
							username
							email
							userProfile {
								id
								profileImage
							}
						}
						communityPostMedia {
							id
							createdAt
							updatedAt
							metaTitle
							description
							imageURL
							communityPostId
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
