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

export const CREATE_FIRST_LEVEL_COMMENT = gql`
	mutation createFirstLevelComment(
		$postId: String!
		$input: CommentInput!
		$mention: MentionsInput
	) {
		createFirstLevelComment(postId: $postId, input: $input, mention: $mention) {
			errors {
				message
				code
				statusCode
			}
			comment {
				id
				content
				communityPostId
				authorId
				creator {
					id
					fullName
					username
					userProfile {
						id
						profileImage
					}
				}
				repliesCount
				createdAt
				updatedAt
			}
		}
	}
`;

export const CREATE_SECOND_LEVEL_COMMENT = gql`
	mutation createSecondLevelComment(
		$commentId: String!
		$input: CommentInput!
		$mention: MentionsInput
	) {
		createSecondLevelComment(commentId: $commentId, input: $input, mention: $mention) {
			errors {
				message
				code
				statusCode
			}
			comment {
				id
				content
				authorId
				commentId
				creator {
					id
					fullName
					username
					userProfile {
						id
						profileImage
					}
				}
				createdAt
				updatedAt
			}
		}
	}
`;

export const CREATE_THIRD_LEVEL_COMMENT = gql`
	mutation createThirdLevelComment(
		$commentId: String!
		$input: CommentInput!
		$mention: MentionsInput
	) {
		createThirdLevelComment(commentId: $commentId, input: $input, mention: $mention) {
			errors {
				message
				code
				statusCode
			}
			comment {
				id
				content
				communityPostId
				authorId
				commentId
				creator {
					id
					fullName
					username
					userProfile {
						id
						profileImage
					}
				}
				createdAt
				updatedAt
			}
		}
	}
`;
