import { gql } from '@apollo/client';

export const POST_FRAGMENT = gql`
	fragment PostFragment on Post {
		id
		text
		companyId
		createdAt
		comments {
			id
			text
		}
		tags {
			id
			name
		}
		creator {
			id
			fullName
			email
			userProfile {
				id
				profileImage
			}
		}
		company {
			id
			legalName
			name
		}
		postImage {
			id
			createdAt
			updatedAt
			metaTitle
			imageURL
			description
			postId
		}
	}
`;

export const GET_COMPANY_POST = gql`
	query postsByCompanyId(
		$id: String!
		$before: String
		$after: String
		$first: Float
		$last: Float
	) {
		postsByCompanyId(id: $id, before: $before, after: $after, first: $first, last: $last) {
			edges {
				cursor
				node {
					...PostFragment
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
	${POST_FRAGMENT}
`;

export const GET_POST_FOLLOWED_BY_USER = gql`
	query companyPostsFollowedByUser(
		$before: String
		$after: String
		$first: Float
		$last: Float
		$order: OrderPosts
	) {
		companyPostsFollowedByUser(
			before: $before
			after: $after
			first: $first
			last: $last
			order: $order
		) {
			edges {
				cursor
				node {
					...PostFragment
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
	${POST_FRAGMENT}
`;

export const CREATE_COMMENT_FEED = gql`
	mutation commentToPost($postId: String!, $data: CreateCommentInput!) {
		commentToPost(postId: $postId, input: $data) {
			errors {
				message
				field
				code
				status
			}
			comment {
				id
				text
				creator {
					id
					fullName
				}
				createdAt
				creatorId
			}
		}
	}
`;

export const CREATE_COMMENT_REPLY = gql`
	mutation commentReply(
		$commentId: String!
		$mention: CreateMentionsInput
		$input: CreateCommentInput!
	) {
		commentReply(commentId: $commentId, mention: $mention, input: $input) {
			errors {
				message
				code
				statusCode
			}
			replies {
				id
				createdAt
				updatedAt
				text
				postId
				creatorId
				repliedToCommentId
				creator {
					id
					email
					fullName
				}
				mentions {
					id
					email
					fullName
				}
			}
		}
	}
`;

export const GET_COMMENTS = gql`
	query comments(
		$postId: String!
		$before: String
		$after: String
		$first: Float
		$last: Float
		$order: OrderCommentsList
	) {
		comments(
			postId: $postId
			before: $before
			after: $after
			first: $first
			last: $last
			order: { direction: desc, orderBy: createdAt }
		) {
			errors {
				message
				field
				code
				status
			}
			comments {
				edges {
					cursor
					node {
						id
						text
						createdAt
						creator {
							id
							email
							fullName
						}
						replies(before: $before, after: $after, first: $first, last: $last, order: $order) {
							edges {
								cursor
								node {
									id
									text
									createdAt
									creator {
										id
										email
										fullName
									}
									repliedToCommentId
									replies(before: $before, after: $after, first: $first, last: $last, order: $order) {
										edges {
											cursor
											node {
												id
												text
												createdAt
												creator {
													id
													email
													fullName
												}
												repliedToCommentId
												repliedToReplyId
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

export const REACTIONS = gql`
	query getReactions {
		getReactions {
			id
			createdAt
			updatedAt
			reactionType
		}
	}
`;

export const CREATE_REACTION = gql`
	mutation createLikes($postId: String!, $reactionType: String!) {
		createLikes(data: { postId: $postId, reactionType: $reactionType }) {
			likes {
				id
				createdAt
				updatedAt
				postId
				reactionId
				userId
				user {
					id
					fullName
					email
				}
				reactions {
					id
					reactionType
					createdAt
					updatedAt
				}
			}
			isDisliked
		}
	}
`;

export const GET_REACTIONS_POST = gql`
	query getLikesByPost($postId: String!) {
		getLikesByPost(
			postId: $postId
			paginate: { skip: 0, take: 50 }
			order: { direction: asc, orderBy: createdAt }
		) {
			edges {
				cursor
			}
			nodes {
				id
				createdAt
				updatedAt
				postId
				reactionId
				userId
				user {
					id
					fullName
				}
			}
			totalCount
			hasNextPage
		}
	}
`;
