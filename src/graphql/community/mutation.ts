import { gql } from '@apollo/client';

export const CREATE_COMMUNITY_POST = gql`
	mutation communityPostCreate($input: CommunityPostInput!, $files: [Upload!]) {
		communityPostCreate(input: $input, files: $files) {
			errors {
				code
				message
				statusCode
			}
			communityPost {
				id
				createdAt
				updatedAt
				text
				communityId
				slug
				authorId
				isDeleted
				isApproved
				communityPostMedia {
					id
					createdAt
					updatedAt
					metaTitle
					description
					imageURL
					communityPostId
				}
				creator {
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
				}
			}
		}
	}
`;

export const JOIN_PUBLIC_COMMUNITY = gql`
	mutation joinPublicCommunity($input: CommunityMemberInput!) {
		joinPublicCommunity(input: $input) {
			errors {
				message
				code
				statusCode
			}
			joinCommunity {
				id
				createdAt
				updatedAt
				communityId
				invitedById
				memberId
				communityRole {
					id
					role
				}
			}
		}
	}
`;
