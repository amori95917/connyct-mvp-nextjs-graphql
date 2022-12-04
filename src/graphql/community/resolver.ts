import { gql } from '@apollo/client';

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
	query getCommunity($companyId: String!) {
		getCommunity(companyId: $companyId) {
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
					id
					name
					legalName
				}
				user {
					id
					fullName
				}
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
	}
`;
