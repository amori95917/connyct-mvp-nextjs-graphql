import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
	fragment UserFragment on User {
		id
		createdAt
		updatedAt
		fullName
		username
		email
		userProfile {
			id
			profileImage
		}
		company {
			id
			ownerId
			legalName
			name
		}
		isEmailVerified
		isSuperuser
		isAdmin
		isValid
		confirm
		emailToken
		roles {
			id
			name
		}
		activeRole {
			id
			name
		}
	}
`;

export const CURRENT_USER_QUERY = gql`
	query me {
		me {
			...UserFragment
		}
	}
	${USER_FRAGMENT}
`;

export const GET_USER = gql`
	query getUser($id: String!) {
		getUser(userId: $id) {
			fullName
			company {
				id
				legalName
			}
		}
	}
`;

export const GET_USERS = gql`
	query listUsers(
		$before: String
		$after: String
		$first: Float
		$last: Float
		$order: OrderListUsers
		$filter: FilterListUsers
	) {
		listUsers(
			before: $before
			after: $after
			first: $first
			last: $last
			order: $order
			filter: $filter
		) {
			edges {
				cursor
				node {
					...UserFragment
				}
			}
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
			totalCount
		}
	}
	${USER_FRAGMENT}
`;

export const USER_CONNECTIONS_SUMMARY = gql`
	query userConnectionsSummary {
		userConnectionsSummary {
			id
			username
			fullName
			isValid
			summary {
				connectedBrands
				connectedEvangelists
				evangelers
				connectedCommunities
			}
		}
	}
`;
