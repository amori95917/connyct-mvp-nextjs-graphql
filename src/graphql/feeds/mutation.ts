import { gql } from '@apollo/client';

export const CREATE_POST_FIRST_LEVEL_COMMENT = gql`
	mutation createPostFirstLevelComment(
		$postId: String!
		$input: PostCommentInput!
		$mention: PostMentionsInput
	) {
		createPostFirstLevelComment(postId: $postId, input: $input, mention: $mention) {
			errors {
				message
				code
				statusCode
			}
			data {
				id
				content
				postId
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
				mentions {
					id
					fullName
					username
				}
				createdAt
				updatedAt
			}
		}
	}
`;

export const CREATE_POST_SECOND_LEVEL_COMMENT = gql`
	mutation createPostSecondLevelComment(
		$commentId: String!
		$input: PostCommentInput!
		$mention: PostMentionsInput
	) {
		createPostSecondLevelComment(commentId: $commentId, input: $input, mention: $mention) {
			errors {
				message
				code
				statusCode
			}
			data {
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
