import { gql } from '@apollo/client';

export const CREATE_DISCUSSION = gql`
	mutation companyDiscussion($input: CompanyDiscussionInput!) {
		companyDiscussion(input: $input) {
			errors {
				message
			}
			companyDiscussion {
				companyId
				title
				id
				description
			}
		}
	}
`;

export const GET_DISCUSSION = gql`
	query getCompanyDiscussion(
		$companyId: String!
		$before: String
		$after: String
		$first: Float
		$last: Float
	) {
		getCompanyDiscussion(
			companyId: $companyId
			before: $before
			after: $after
			first: $first
			last: $last
		) {
			edges {
				cursor
				node {
					id
					title
					description
					upVote
					updatedAt
					createdAt
					companyId
					company {
						name
						legalName
					}
					createdBy {
						id
						fullName
						image
					}
					upVote
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
`;

export const DISCUSSION_UPVOTE = gql`
	mutation discussionVote($input: DiscussionVoteInput!) {
		discussionVote(input: $input) {
			errors {
				message
			}
			discussionVote {
				id
				createdAt
				updatedAt
				vote
				userId
				discussionId
			}
		}
	}
`;

export const DISCUSSION_DOWNVOTE = gql`
	mutation discussionVote($input: DiscussionVoteInput!) {
		discussionVote(input: $input) {
			errors {
				message
			}
			discussionVote {
				id
				createdAt
				updatedAt
				vote
				userId
				discussionId
			}
		}
	}
`;

export const DISCUSSION_ANSWER_DOWNVOTE = gql`
	mutation discussionAnswerVote($input: DiscussionAnswerVoteInput!) {
		discussionAnswerVote(input: $input) {
			errors {
				message
			}
			discussionAnswerVote {
				id
				createdAt
				updatedAt
				vote
				userId
				discussionId
			}
		}
	}
`;

export const DISCUSSION_ANSWER_UPVOTE = gql`
	mutation discussionAnswerVote($input: DiscussionAnswerVoteInput!) {
		discussionAnswerVote(input: $input) {
			errors {
				message
			}
			discussionAnswerVote {
				id
				createdAt
				updatedAt
				vote
				userId
				discussionId
			}
		}
	}
`;

export const DISCUSSION_POST_ANSWER = gql`
	mutation createDiscussionAnswer($answer: DiscussionAnswerInput!) {
		createDiscussionAnswer(answer: $answer) {
			errors {
				message
			}
			discussionAnswer {
				answer
			}
		}
	}
`;

export const GET_DISCUSSION_ANSWER = gql`
	query getDiscussionAnswerByDiscussionId(
		$discussionId: String!
		$before: String
		$after: String
		$first: Float
		$last: Float
	) {
		getDiscussionAnswerByDiscussionId(
			discussionId: $discussionId
			before: $before
			after: $after
			first: $first
			last: $last
		) {
			edges {
				cursor
				node {
					id
					answer
					updatedAt
					createdAt
					upVote
					user {
						fullName
						id
					}
					discussion {
						id
						title
						description
						company {
							id
							name
							legalName
						}
					}
					answerReply {
						edges {
							node {
								id
								createdAt
								updatedAt
								answer
								discussionId
								userId

								user {
									id
									fullName
								}
								repliedToAnswerId
							}
						}
					}
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
`;

export const GET_DISCUSSION_BY_ID = gql`
	query getCompanyDiscussionById($discussionId: String!) {
		getCompanyDiscussionById(discussionId: $discussionId) {
			id
			createdAt
			updatedAt
			title
			description
			companyId
			company {
				name
				legalName
			}
			userId
			upVote
			createdBy {
				id
				fullName
			}
		}
	}
`;

export const CREATE_DISCUSSION_ANSWER_REPLY = gql`
	mutation discussionAnswerReply($input: ReplyToAnswerInput!) {
		discussionAnswerReply(input: $input) {
			errors {
				message
			}
			discussionAnswerReply {
				id
				createdAt
				updatedAt
				answer
				userId
				user {
					id
					fullName
				}
				discussionId
			}
		}
	}
`;
