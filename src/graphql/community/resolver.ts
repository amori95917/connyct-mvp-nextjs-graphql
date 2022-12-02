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
