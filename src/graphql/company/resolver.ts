import { gql } from '@apollo/client';

export const GET_COMPANY = gql`
	query getCompanyById($id: String!) {
		getCompanyById(id: $id) {
			id
			createdAt
			updatedAt
			name
			slogan
			legalName
			registrationNumber
			establishedDate
			companyStage
			description
			ownership
			mission
			vision
			followers
			addresses
			numberOfemployees
			contactEmail
			transactions
			isActive
			isVerified
			ownerId
			website
			contactNumber
		}
	}
`;

export const SUGGESTION_COMPANIES = gql`
	query companiesSuggestions(
		$before: String
		$after: String
		$first: Float
		$last: Float
		$order: OrderListCompanies
		$filter: FilterListCompanies
	) {
		companiesSuggestions(
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
					id
					name
					legalName
					registrationNumber
					establishedDate
					companyStage
					description
					slogan
					followers
					createdAt
					updatedAt
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
`;

export const EDIT_COMPANY = gql`
	mutation editCompany($id: String!, $data: CompanyEditInput!) {
		editCompany(id: $id, data: $data) {
			contactEmail
			companyStage
			name
			legalName
			addresses
		}
	}
`;

export const CREATE_POST = gql`
	mutation post($data: CreatePostInput!, $companyId: String!, $file: [Upload!]) {
		post(data: $data, companyId: $companyId, file: $file) {
			post {
				id
				text
				creator {
					id
				}
				tags {
					id
					name
				}
				createdAt
			}
		}
	}
`;

export const GET_FOLLOWED_COMPANY = gql`
	query getCompanysFollowedByUser(
		$before: String
		$after: String
		$first: Float
		$last: Float
		$order: OrderFollowedCompanyList
	) {
		getCompanysFollowedByUser(
			before: $before
			after: $after
			first: $first
			last: $last
			order: $order
		) {
			edges {
				cursor
				# company fragment
				node {
					id
					name
					legalName
					registrationNumber
					companyStage
					followers
					isVerified
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
`;
