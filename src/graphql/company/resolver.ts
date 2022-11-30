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
			registrationNumberType
			establishedDate
			companyStage
			description
			ownership
			mission
			vision
			followers
			numberOfemployees
			contactEmail
			transactions
			avatar
			isActive
			isVerified
			ownerId
			website
			contactNumber
			companyDocument {
				id
				createdAt
				updatedAt
				companyId
				type
				document
			}
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

export const COMPANY_GENERAL_EDIT = gql`
	mutation companyGeneralInfoEdit($companyId: String!, $data: CompanyEditInput!) {
		companyGeneralInfoEdit(data: $data, companyId: $companyId) {
			errors {
				message
				code
				statusCode
			}
			company {
				name
				legalName
				description
				registrationNumberType
				registrationNumber
				establishedDate
				slogan
				companyStage
			}
		}
	}
`;

export const COMPANY_AVATAR_MUTATION = gql`
	mutation companyAvatar($companyId: String!, $avatar: Upload!) {
		companyAvatar(avatar: $avatar, companyId: $companyId) {
			errors {
				message
				code
				statusCode
			}
			company {
				avatar
			}
		}
	}
`;

export const DOCUMENT_MUTATION = gql`
	mutation companyDocumentCreate($input: CompanyDocumentInput!, $document: [Upload!]!) {
		companyDocumentCreate(document: $document, input: $input) {
			errors {
				message
				code
				statusCode
			}
			company {
				name
				legalName
			}
		}
	}
`;

export const COMPANY_BRANCH_EDIT_MUTATION = gql`
	mutation editCompanyBranch($id: String!, $data: CompanyBranchEditInput!) {
		editCompanyBranch(id: $id, data: $data) {
			branch {
				id
				createdAt
				updatedAt
				name
				type
				contactEmail
				contactNumber
				country
				city
				zipCode
				state
				street
			}
		}
	}
`;

export const COMPANY_BRANCH_CREATE_MUTATION = gql`
	mutation createCompanyBranch($id: String!, $data: CompanyBranchInput!) {
		createCompanyBranch(id: $id, data: $data) {
			branch {
				id
				createdAt
				updatedAt
				name
				type
				contactEmail
				contactNumber
				country
				city
				zipCode
				state
				street
			}
		}
	}
`;

export const GET_BRANCH_BY_COMPANY_ID = gql`
	query getBranchesByCompanyId($id: String!) {
		getBranchesByCompanyId(id: $id) {
			errors {
				message
				code
				statusCode
			}
			branches {
				id
				createdAt
				updatedAt
				name
				country
				city
				contactEmail
				contactNumber
				type
				zipCode
				state
				street
			}
		}
	}
`;
