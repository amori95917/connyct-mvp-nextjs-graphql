import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type AcceptInvitePayload = {
  __typename?: 'AcceptInvitePayload';
  errors?: Maybe<Array<CustomError>>;
  isAccepted?: Maybe<Scalars['Boolean']>;
};

export type Auth = {
  __typename?: 'Auth';
  /** JWT access token */
  accessToken?: Maybe<Scalars['String']>;
  company?: Maybe<Array<Company>>;
  errors?: Maybe<Array<CustomError>>;
  otp?: Maybe<Otp>;
  /** JWT refresh token */
  refreshToken?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Branch = {
  __typename?: 'Branch';
  city: Scalars['String'];
  contactEmail: Scalars['String'];
  contactNumber: Scalars['String'];
  country: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  type: BranchType;
  updatedAt: Scalars['DateTime'];
  zipCode?: Maybe<Scalars['String']>;
};

/** The branch type can be CORPORATE and BRANCH_OFFICE */
export enum BranchType {
  BranchOffice = 'BRANCH_OFFICE',
  Headquarter = 'HEADQUARTER'
}

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['DateTime'];
  creator: User;
  creatorId: Scalars['String'];
  id: Scalars['ID'];
  mentions: Array<User>;
  myRatingStatus: RatingStatus;
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Int']>;
  repliedToCommentId?: Maybe<Scalars['String']>;
  repliedToReplyId?: Maybe<Scalars['String']>;
  replies?: Maybe<RepliesPagination>;
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


export type CommentRepliesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  order?: InputMaybe<OrderCommentsList>;
};

export type CommentDeletePayload = {
  __typename?: 'CommentDeletePayload';
  errors?: Maybe<Array<UserError>>;
  isDeleted?: Maybe<Scalars['Boolean']>;
};

export type CommentEdge = {
  __typename?: 'CommentEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Comment>;
};

/** Order by:createdAt */
export enum CommentOrderBy {
  CreatedAt = 'createdAt'
}

export type CommentPageInfo = {
  __typename?: 'CommentPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type CommentPagination = {
  __typename?: 'CommentPagination';
  edges?: Maybe<Array<CommentEdge>>;
  pageInfo?: Maybe<CommentPageInfo>;
  totalCount?: Maybe<Scalars['Float']>;
};

export type CommentPaginationPayload = {
  __typename?: 'CommentPaginationPayload';
  comments?: Maybe<CommentPagination>;
  errors?: Maybe<Array<UserError>>;
};

export type CommentReactionPaginationPayload = {
  __typename?: 'CommentReactionPaginationPayload';
  errors?: Maybe<Array<CustomError>>;
  reactions?: Maybe<CommentReactionsPagination>;
};

export type CommentReactions = {
  __typename?: 'CommentReactions';
  comment?: Maybe<Comment>;
  commentId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  creatorId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  reactionId?: Maybe<Scalars['String']>;
  reactors?: Maybe<Array<User>>;
  updatedAt: Scalars['DateTime'];
};

export type CommentReactionsEdge = {
  __typename?: 'CommentReactionsEdge';
  cursor: Scalars['String'];
  node: CommentReactions;
};

export type CommentReactionsInput = {
  commentId: Scalars['String'];
  reactionType: Scalars['String'];
};

/** Order by:createdAt */
export enum CommentReactionsOrderBy {
  CreatedAt = 'createdAt'
}

export type CommentReactionsOrderList = {
  direction: OrderDirection;
  orderBy?: InputMaybe<CommentReactionsOrderBy>;
};

export type CommentReactionsPagination = {
  __typename?: 'CommentReactionsPagination';
  edges?: Maybe<Array<CommentReactionsEdge>>;
  hasNextPage: Scalars['Boolean'];
  nodes?: Maybe<Array<CommentReactions>>;
  totalCount: Scalars['Int'];
};

export type CommentReactionsPayload = {
  __typename?: 'CommentReactionsPayload';
  commentReactions?: Maybe<CommentReactions>;
  errors?: Maybe<Array<CustomError>>;
  isDisliked?: Maybe<Scalars['Boolean']>;
};

export type Community = {
  __typename?: 'Community';
  communityRole?: Maybe<Array<CommunityRole>>;
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<User>;
  creatorId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  followersCount?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  members?: Maybe<CommunityMemberPaginated>;
  name?: Maybe<Scalars['String']>;
  profile?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


export type CommunityMembersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  order?: InputMaybe<OrderListCommunityMember>;
};

export type CommunityDeletePayload = {
  __typename?: 'CommunityDeletePayload';
  errors?: Maybe<Array<CustomError>>;
  isDeleted?: Maybe<Scalars['Boolean']>;
};

export type CommunityEdge = {
  __typename?: 'CommunityEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Community>;
};

export type CommunityEditInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type CommunityInput = {
  companyId: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type CommunityMember = {
  __typename?: 'CommunityMember';
  community?: Maybe<Community>;
  communityId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  invitedById?: Maybe<Scalars['String']>;
  memberId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type CommunityMemberEdge = {
  __typename?: 'CommunityMemberEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<CommunityMember>;
};

export type CommunityMemberInput = {
  communityId: Scalars['String'];
  companyId: Scalars['String'];
};

export type CommunityMemberInviteInput = {
  communityId: Scalars['String'];
  companyId: Scalars['String'];
  memberId?: InputMaybe<Array<Scalars['String']>>;
};

/** Order by:createdAt */
export enum CommunityMemberOrderBy {
  CreatedAt = 'createdAt'
}

export type CommunityMemberPageInfo = {
  __typename?: 'CommunityMemberPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type CommunityMemberPaginated = {
  __typename?: 'CommunityMemberPaginated';
  edges?: Maybe<Array<CommunityMemberEdge>>;
  pageInfo?: Maybe<CommunityMemberPageInfo>;
  totalCount?: Maybe<Scalars['Float']>;
};

export type CommunityMemberPayload = {
  __typename?: 'CommunityMemberPayload';
  communityMember?: Maybe<Array<CommunityMember>>;
  errors?: Maybe<Array<CustomError>>;
};

/** Order by:createdAt, name */
export enum CommunityOrderBy {
  CreatedAt = 'createdAt',
  Name = 'name'
}

export type CommunityPageInfo = {
  __typename?: 'CommunityPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type CommunityPaginated = {
  __typename?: 'CommunityPaginated';
  edges?: Maybe<Array<CommunityEdge>>;
  pageInfo?: Maybe<CommunityPageInfo>;
  totalCount?: Maybe<Scalars['Float']>;
};

export type CommunityPayload = {
  __typename?: 'CommunityPayload';
  community?: Maybe<Community>;
  errors?: Maybe<Array<CustomError>>;
};

export type CommunityPoliciesPayload = {
  __typename?: 'CommunityPoliciesPayload';
  data?: Maybe<CommunityPolicyPaginated>;
  errors?: Maybe<Array<CustomError>>;
};

export type CommunityPolicy = {
  __typename?: 'CommunityPolicy';
  communityId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type CommunityPolicyDeletePayload = {
  __typename?: 'CommunityPolicyDeletePayload';
  errors?: Maybe<Array<CustomError>>;
  isDeleted?: Maybe<Scalars['Boolean']>;
};

export type CommunityPolicyEdge = {
  __typename?: 'CommunityPolicyEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<CommunityPolicy>;
};

export type CommunityPolicyInput = {
  description: Scalars['String'];
  title: Scalars['String'];
};

export type CommunityPolicyPageInfo = {
  __typename?: 'CommunityPolicyPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type CommunityPolicyPaginated = {
  __typename?: 'CommunityPolicyPaginated';
  edges?: Maybe<Array<CommunityPolicyEdge>>;
  pageInfo?: Maybe<CommunityPolicyPageInfo>;
  totalCount?: Maybe<Scalars['Float']>;
};

export type CommunityPolicyPayload = {
  __typename?: 'CommunityPolicyPayload';
  data?: Maybe<CommunityPolicy>;
  errors?: Maybe<Array<CustomError>>;
};

export type CommunityPolicyUpdateInput = {
  description: Scalars['String'];
  title: Scalars['String'];
};

export type CommunityRole = {
  __typename?: 'CommunityRole';
  community?: Maybe<Community>;
  communityId?: Maybe<Scalars['String']>;
  company?: Maybe<Company>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  role?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
};

/** Order by: name, legalName, createdAt */
export enum CompaniesOrderBy {
  CreatedAt = 'createdAt',
  LegalName = 'legalName',
  Name = 'name'
}

export type Company = {
  __typename?: 'Company';
  accountStatus?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  branches?: Maybe<Array<Branch>>;
  companyDocument?: Maybe<Array<CompanyDocument>>;
  companyStage?: Maybe<Scalars['String']>;
  contactEmail?: Maybe<Scalars['String']>;
  contactNumber?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  establishedDate?: Maybe<Scalars['DateTime']>;
  followers?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  isVerified?: Maybe<Scalars['Boolean']>;
  legalName?: Maybe<Scalars['String']>;
  mission?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  numberOfemployees?: Maybe<Scalars['Float']>;
  ownerId?: Maybe<Scalars['String']>;
  ownership?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  registrationNumber?: Maybe<Scalars['String']>;
  registrationNumberType?: Maybe<Scalars['String']>;
  slogan?: Maybe<Scalars['String']>;
  transactions?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
  vision?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type CompanyAccountStatus = {
  accountStatus: Scalars['String'];
  reason?: InputMaybe<Scalars['String']>;
};

export type CompanyBranchDeletePayload = {
  __typename?: 'CompanyBranchDeletePayload';
  errors?: Maybe<Array<CustomError>>;
  isDeleted?: Maybe<Scalars['Boolean']>;
};

export type CompanyBranchEditInput = {
  city?: InputMaybe<Scalars['String']>;
  contactEmail?: InputMaybe<Scalars['String']>;
  contactNumber?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<BranchType>;
  zipCode?: InputMaybe<Scalars['String']>;
};

export type CompanyBranchInput = {
  city?: InputMaybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  contactNumber: Scalars['String'];
  country?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  type: BranchType;
  zipCode?: InputMaybe<Scalars['String']>;
};

export type CompanyBranchPayload = {
  __typename?: 'CompanyBranchPayload';
  branch?: Maybe<Branch>;
  errors?: Maybe<Array<CustomError>>;
};

export type CompanyDiscussion = {
  __typename?: 'CompanyDiscussion';
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<CreatedBy>;
  description?: Maybe<Scalars['String']>;
  discussionAnswer?: Maybe<DiscussionAnswerPaginated>;
  discussionVote?: Maybe<Array<DiscussionVote>>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  upVote?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId?: Maybe<Scalars['String']>;
};


export type CompanyDiscussionDiscussionAnswerArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  order?: InputMaybe<OrderListDiscussionAnswer>;
};

export type CompanyDiscussionDeletePayload = {
  __typename?: 'CompanyDiscussionDeletePayload';
  errors?: Maybe<Array<CustomError>>;
  isDeleted?: Maybe<Scalars['Boolean']>;
};

export type CompanyDiscussionEdge = {
  __typename?: 'CompanyDiscussionEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<CompanyDiscussion>;
};

export type CompanyDiscussionInput = {
  companyId: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
};

export type CompanyDiscussionPageInfo = {
  __typename?: 'CompanyDiscussionPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type CompanyDiscussionPayload = {
  __typename?: 'CompanyDiscussionPayload';
  companyDiscussion?: Maybe<CompanyDiscussion>;
  errors?: Maybe<Array<CustomError>>;
};

export type CompanyDiscussionUpdateInput = {
  description: Scalars['String'];
  title: Scalars['String'];
};

export type CompanyDocument = {
  __typename?: 'CompanyDocument';
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  document?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  type?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type CompanyDocumentEditInput = {
  type: Scalars['String'];
};

export type CompanyDocumentEditPayload = {
  __typename?: 'CompanyDocumentEditPayload';
  company?: Maybe<Company>;
  companyDocument?: Maybe<CompanyDocument>;
  errors?: Maybe<Array<CustomError>>;
};

export type CompanyDocumentInput = {
  companyId: Scalars['String'];
  type: Scalars['String'];
};

export type CompanyEdge = {
  __typename?: 'CompanyEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Company>;
};

export type CompanyEditInput = {
  companyStage?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  establishedDate: Scalars['DateTime'];
  legalName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  registrationNumber: Scalars['String'];
  registrationNumberType?: InputMaybe<Scalars['String']>;
  slogan?: InputMaybe<Scalars['String']>;
};

export type CompanyPageInfo = {
  __typename?: 'CompanyPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type CompanyPaginated = {
  __typename?: 'CompanyPaginated';
  edges?: Maybe<Array<CompanyEdge>>;
  pageInfo?: Maybe<CompanyPageInfo>;
  totalCount?: Maybe<Scalars['Float']>;
};

export type CompanyPayload = {
  __typename?: 'CompanyPayload';
  company?: Maybe<Company>;
  companyDocument?: Maybe<Array<CompanyDocument>>;
  errors?: Maybe<Array<CustomError>>;
};

export type CreateCommentInput = {
  text: Scalars['String'];
};

export type CreateCompanyGeneralInput = {
  businessType: Scalars['String'];
  companyStage: Scalars['String'];
  establishedDate: Scalars['DateTime'];
  legalName: Scalars['String'];
  name: Scalars['String'];
  ownership: Scalars['String'];
  registrationNumber: Scalars['String'];
};

export type CreateCompanyInput = {
  branches: Scalars['Float'];
  businessType: Scalars['String'];
  companyStage: Scalars['String'];
  establishedDate: Scalars['DateTime'];
  legalName: Scalars['String'];
  name: Scalars['String'];
  numberOfemployees: Scalars['Float'];
  ownership: Scalars['String'];
  registrationNumber: Scalars['String'];
  transactions: Scalars['Float'];
};

export type CreateMentionsInput = {
  mentionIds?: InputMaybe<Array<Scalars['String']>>;
};

export type CreatePostInput = {
  description?: InputMaybe<Scalars['String']>;
  metaTitle?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  text: Scalars['String'];
};

export type CreatePostPayload = {
  __typename?: 'CreatePostPayload';
  errors?: Maybe<Array<CustomError>>;
  post?: Maybe<Post>;
  postImage?: Maybe<Array<PostImage>>;
  tags?: Maybe<Array<Tag>>;
};

export type CreatedBy = {
  __typename?: 'CreatedBy';
  fullName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type CustomError = {
  __typename?: 'CustomError';
  code?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  statusCode?: Maybe<Scalars['Float']>;
};

export type DeletePostPayload = {
  __typename?: 'DeletePostPayload';
  errors?: Maybe<Array<CustomError>>;
  isDeleteSuccessful?: Maybe<Scalars['Boolean']>;
};

export type DiscussionAnswer = {
  __typename?: 'DiscussionAnswer';
  answer?: Maybe<Scalars['String']>;
  answerReply?: Maybe<DiscussionAnswerReplyPaginated>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<CreatedBy>;
  discussion?: Maybe<CompanyDiscussion>;
  discussionId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mentions?: Maybe<Array<User>>;
  upVote?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId?: Maybe<Scalars['String']>;
};


export type DiscussionAnswerAnswerReplyArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  order?: InputMaybe<OrderListDiscussionAnswer>;
};

export type DiscussionAnswerDeletePayload = {
  __typename?: 'DiscussionAnswerDeletePayload';
  errors?: Maybe<Array<CustomError>>;
  isDeleted?: Maybe<Scalars['Boolean']>;
};

export type DiscussionAnswerEdge = {
  __typename?: 'DiscussionAnswerEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<DiscussionAnswer>;
};

export type DiscussionAnswerInput = {
  answer: Scalars['String'];
  discussionId: Scalars['String'];
  mentionIds?: InputMaybe<Array<Scalars['String']>>;
};

/** Order by:createdAt */
export enum DiscussionAnswerOrderBy {
  CreatedAt = 'createdAt'
}

export type DiscussionAnswerPageInfo = {
  __typename?: 'DiscussionAnswerPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type DiscussionAnswerPaginated = {
  __typename?: 'DiscussionAnswerPaginated';
  edges?: Maybe<Array<DiscussionAnswerEdge>>;
  pageInfo?: Maybe<DiscussionAnswerPageInfo>;
  totalCount?: Maybe<Scalars['Float']>;
};

export type DiscussionAnswerPayload = {
  __typename?: 'DiscussionAnswerPayload';
  discussionAnswer?: Maybe<DiscussionAnswer>;
  errors?: Maybe<Array<CustomError>>;
};

export type DiscussionAnswerReply = {
  __typename?: 'DiscussionAnswerReply';
  answer?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<CreatedBy>;
  discussion?: Maybe<CompanyDiscussion>;
  discussionId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  parentAnswer?: Maybe<DiscussionAnswer>;
  repliedToAnswerId?: Maybe<Scalars['String']>;
  upVote?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId?: Maybe<Scalars['String']>;
};

export type DiscussionAnswerReplyEdge = {
  __typename?: 'DiscussionAnswerReplyEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<DiscussionAnswerReply>;
};

export type DiscussionAnswerReplyPageInfo = {
  __typename?: 'DiscussionAnswerReplyPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type DiscussionAnswerReplyPaginated = {
  __typename?: 'DiscussionAnswerReplyPaginated';
  edges?: Maybe<Array<DiscussionAnswerReplyEdge>>;
  pageInfo?: Maybe<DiscussionAnswerReplyPageInfo>;
  totalCount?: Maybe<Scalars['Float']>;
};

export type DiscussionAnswerReplyPayload = {
  __typename?: 'DiscussionAnswerReplyPayload';
  discussionAnswerReply?: Maybe<DiscussionAnswerReply>;
  errors?: Maybe<Array<CustomError>>;
};

export type DiscussionAnswerUpdateInput = {
  answer: Scalars['String'];
  mentionIds?: InputMaybe<Array<Scalars['String']>>;
};

export type DiscussionAnswerVote = {
  __typename?: 'DiscussionAnswerVote';
  createdAt: Scalars['DateTime'];
  discussion?: Maybe<CompanyDiscussion>;
  discussionAnswer?: Maybe<DiscussionAnswer>;
  discussionId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
  vote?: Maybe<Scalars['String']>;
};

export type DiscussionAnswerVoteInput = {
  discussionAnswerId: Scalars['String'];
  discussionId: Scalars['String'];
  vote: Scalars['String'];
};

export type DiscussionAnswerVotePayload = {
  __typename?: 'DiscussionAnswerVotePayload';
  discussionAnswerVote?: Maybe<DiscussionAnswerVote>;
  errors?: Maybe<Array<CustomError>>;
  removeVote?: Maybe<Scalars['Boolean']>;
};

/** Order by:createdAt */
export enum DiscussionOrderBy {
  CreatedAt = 'createdAt'
}

export type DiscussionPaginated = {
  __typename?: 'DiscussionPaginated';
  edges?: Maybe<Array<CompanyDiscussionEdge>>;
  pageInfo?: Maybe<CompanyDiscussionPageInfo>;
  totalCount?: Maybe<Scalars['Float']>;
};

export type DiscussionVote = {
  __typename?: 'DiscussionVote';
  createdAt: Scalars['DateTime'];
  discussion?: Maybe<CompanyDiscussion>;
  discussionId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<Array<User>>;
  userId?: Maybe<Scalars['String']>;
  vote?: Maybe<Scalars['String']>;
};

export type DiscussionVoteInput = {
  discussionId: Scalars['String'];
  vote: Scalars['String'];
};

export type DiscussionVotePayload = {
  __typename?: 'DiscussionVotePayload';
  discussionVote?: Maybe<DiscussionVote>;
  errors?: Maybe<Array<CustomError>>;
  removeVote?: Maybe<Scalars['Boolean']>;
};

export type FilterListCompanies = {
  omni?: InputMaybe<Scalars['String']>;
};

export type FilterListUsers = {
  isValid?: InputMaybe<Scalars['Boolean']>;
  omni?: InputMaybe<Scalars['String']>;
};

export type FollowCompany = {
  __typename?: 'FollowCompany';
  createdAt: Scalars['DateTime'];
  followedById: Scalars['String'];
  followedToId: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type FollowCompanyInput = {
  followedToId: Scalars['String'];
};

export type FollowUserToUser = {
  __typename?: 'FollowUserToUser';
  createdAt: Scalars['DateTime'];
  followedById: Scalars['String'];
  followedToId: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type FollowUserToUserInput = {
  followedToID: Scalars['String'];
};

/** Order by: createdAt */
export enum FollowedCompanyOrderBy {
  CreatedAt = 'createdAt'
}

export type GetCommunityMemberPayload = {
  __typename?: 'GetCommunityMemberPayload';
  communityMember?: Maybe<CommunityMemberPaginated>;
  errors?: Maybe<Array<CustomError>>;
};

export type GetCommunityPayload = {
  __typename?: 'GetCommunityPayload';
  community?: Maybe<CommunityPaginated>;
  errors?: Maybe<Array<CustomError>>;
};

export type GetCompanyBranchPayload = {
  __typename?: 'GetCompanyBranchPayload';
  branches?: Maybe<Array<Branch>>;
  errors?: Maybe<Array<CustomError>>;
};

export type Industry = {
  __typename?: 'Industry';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type IndustryInput = {
  description?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
};

export type IndustryPayload = {
  __typename?: 'IndustryPayload';
  error?: Maybe<Scalars['String']>;
  industries?: Maybe<Array<Industry>>;
  industry?: Maybe<Industry>;
  isDeletedSuccessful?: Maybe<Scalars['Boolean']>;
};

export type InvitedEmployee = {
  __typename?: 'InvitedEmployee';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  invitedEmail: Scalars['String'];
  invitedId: Scalars['String'];
  invitedRoleId: Scalars['String'];
  isInviteAccepted: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type InvitedEmployeeInput = {
  invitedEmail: Scalars['String'];
  role: Scalars['String'];
};

export type JoinCommunityPayload = {
  __typename?: 'JoinCommunityPayload';
  errors?: Maybe<Array<CustomError>>;
  joinCommunity?: Maybe<CommunityMember>;
};

export type Likes = {
  __typename?: 'Likes';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  postId: Scalars['String'];
  reactionId: Scalars['String'];
  reactions?: Maybe<Reactions>;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  userId: Scalars['String'];
};

export type LikesEdge = {
  __typename?: 'LikesEdge';
  cursor: Scalars['String'];
  node: Likes;
};

export type LikesInput = {
  postId: Scalars['String'];
  reactionType: Scalars['String'];
};

export type LikesPayload = {
  __typename?: 'LikesPayload';
  isDisliked?: Maybe<Scalars['Boolean']>;
  likes?: Maybe<Likes>;
};

export type LoginInput = {
  emailOrUsername: Scalars['String'];
  password: Scalars['String'];
};

export type LoginLinkAccessInput = {
  email: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptCommunityInvite: AcceptInvitePayload;
  activeOrDeactiveIndustry: IndustryPayload;
  changePassword: User;
  commentDelete: CommentDeletePayload;
  commentReaction: CommentReactionsPayload;
  commentReply: ReplyToCommentPayload;
  commentToPost: NewReplyPayload;
  commentUpdate: NewReplyPayload;
  companyAccountStatus: CompanyPayload;
  companyAvatar: CompanyPayload;
  companyCommunity: CommunityPayload;
  companyCommunityDelete: CommunityDeletePayload;
  companyCommunityEdit: CommunityPayload;
  companyDiscussion: CompanyDiscussionPayload;
  companyDiscussionDelete: CompanyDiscussionDeletePayload;
  companyDiscussionUpdate: CompanyDiscussionPayload;
  companyDocumentCreate: CompanyPayload;
  companyDocumentEdit: CompanyDocumentEditPayload;
  companyGeneralInfoEdit: CompanyPayload;
  confirmEmail: Token;
  createCommunityPolicy: CommunityPolicyPayload;
  createCompany: Company;
  createCompanyBranch: CompanyBranchPayload;
  createCompanyGeneralInfo: Company;
  createDiscussionAnswer: DiscussionAnswerPayload;
  createEmployee: User;
  createIndustry: IndustryPayload;
  createLikes: LikesPayload;
  deleteCommunityPolicy: CommunityPolicyDeletePayload;
  deleteCompanyBranch: CompanyBranchDeletePayload;
  deleteIndustry: IndustryPayload;
  discussionAnswerDelete: DiscussionAnswerDeletePayload;
  discussionAnswerDownvote: DiscussionAnswerVotePayload;
  discussionAnswerReply: DiscussionAnswerReplyPayload;
  discussionAnswerUpdate: DiscussionAnswerPayload;
  discussionAnswerVote: DiscussionAnswerVotePayload;
  discussionDownvote: DiscussionVotePayload;
  discussionVote: DiscussionVotePayload;
  downvoteComment: RatePayload;
  downvotePost: RatePayload;
  editCompanyBranch: CompanyBranchPayload;
  editUserProfile: UserProfilePayload;
  followCompany: FollowCompany;
  followUserToUser: FollowUserToUser;
  inviteEmployee: InvitedEmployee;
  inviteUserByCommunityAdmin: CommunityMemberPayload;
  inviteUserByCommunityUser: CommunityMemberPayload;
  joinPublicCommunity: JoinCommunityPayload;
  login: Auth;
  loginLinkAccess: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  otpVerification: OtpPayload;
  post: CreatePostPayload;
  postDelete: DeletePostPayload;
  postUpdate: UpdatePostPayload;
  refreshToken: Token;
  removeLike: Likes;
  removeRatingFromComment: RatePayload;
  removeRatingFromPost: RatePayload;
  replyToReply: RepliesToRepliesPayload;
  requestConfirmEmail: Scalars['Boolean'];
  requestResetPassword: Scalars['Boolean'];
  resendOtp: OtpPayload;
  resetPassword: Token;
  signup: Auth;
  unfollowCompany: Scalars['String'];
  unfollowUser: Scalars['String'];
  updateCommunityPolicy: CommunityPolicyPayload;
  updateIndustry: IndustryPayload;
  updateStatusUser: User;
  updateUser: User;
  upvoteComment: RatePayload;
  upvotePost: RatePayload;
};


export type MutationAcceptCommunityInviteArgs = {
  communityMemberId: Scalars['String'];
  companyId: Scalars['String'];
};


export type MutationActiveOrDeactiveIndustryArgs = {
  id: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationCommentDeleteArgs = {
  commentId: Scalars['String'];
};


export type MutationCommentReactionArgs = {
  input: CommentReactionsInput;
};


export type MutationCommentReplyArgs = {
  commentId: Scalars['String'];
  input: CreateCommentInput;
  mention?: InputMaybe<CreateMentionsInput>;
};


export type MutationCommentToPostArgs = {
  input: CreateCommentInput;
  mention?: InputMaybe<CreateMentionsInput>;
  postId: Scalars['String'];
};


export type MutationCommentUpdateArgs = {
  commentId: Scalars['String'];
  input: CreateCommentInput;
  mention?: InputMaybe<CreateMentionsInput>;
};


export type MutationCompanyAccountStatusArgs = {
  companyId: Scalars['String'];
  data: CompanyAccountStatus;
};


export type MutationCompanyAvatarArgs = {
  avatar: Scalars['Upload'];
  companyId: Scalars['String'];
};


export type MutationCompanyCommunityArgs = {
  input: CommunityInput;
  profile: Scalars['Upload'];
};


export type MutationCompanyCommunityDeleteArgs = {
  communityId: Scalars['String'];
};


export type MutationCompanyCommunityEditArgs = {
  communityId: Scalars['String'];
  input: CommunityEditInput;
  profile: Scalars['Upload'];
};


export type MutationCompanyDiscussionArgs = {
  input: CompanyDiscussionInput;
};


export type MutationCompanyDiscussionDeleteArgs = {
  id: Scalars['String'];
};


export type MutationCompanyDiscussionUpdateArgs = {
  discussionId: Scalars['String'];
  input: CompanyDiscussionUpdateInput;
};


export type MutationCompanyDocumentCreateArgs = {
  document: Array<Scalars['Upload']>;
  input: CompanyDocumentInput;
};


export type MutationCompanyDocumentEditArgs = {
  companyId: Scalars['String'];
  document: Scalars['Upload'];
  documentId: Scalars['String'];
  editDocument: CompanyDocumentEditInput;
};


export type MutationCompanyGeneralInfoEditArgs = {
  companyId: Scalars['String'];
  data: CompanyEditInput;
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String'];
};


export type MutationCreateCommunityPolicyArgs = {
  id: Scalars['String'];
  input: CommunityPolicyInput;
};


export type MutationCreateCompanyArgs = {
  data: CreateCompanyInput;
};


export type MutationCreateCompanyBranchArgs = {
  data: CompanyBranchInput;
  id: Scalars['String'];
};


export type MutationCreateCompanyGeneralInfoArgs = {
  data: CreateCompanyGeneralInput;
};


export type MutationCreateDiscussionAnswerArgs = {
  answer: DiscussionAnswerInput;
};


export type MutationCreateEmployeeArgs = {
  data: UserEmployeeInput;
};


export type MutationCreateIndustryArgs = {
  data: IndustryInput;
};


export type MutationCreateLikesArgs = {
  data: LikesInput;
};


export type MutationDeleteCommunityPolicyArgs = {
  id: Scalars['String'];
};


export type MutationDeleteCompanyBranchArgs = {
  companyId: Scalars['String'];
  id: Scalars['String'];
};


export type MutationDeleteIndustryArgs = {
  id: Scalars['String'];
};


export type MutationDiscussionAnswerDeleteArgs = {
  id: Scalars['String'];
};


export type MutationDiscussionAnswerDownvoteArgs = {
  input: DiscussionAnswerVoteInput;
};


export type MutationDiscussionAnswerReplyArgs = {
  input: ReplyToAnswerInput;
};


export type MutationDiscussionAnswerUpdateArgs = {
  answerId: Scalars['String'];
  updateAnswer: DiscussionAnswerUpdateInput;
};


export type MutationDiscussionAnswerVoteArgs = {
  input: DiscussionAnswerVoteInput;
};


export type MutationDiscussionDownvoteArgs = {
  input: DiscussionVoteInput;
};


export type MutationDiscussionVoteArgs = {
  input: DiscussionVoteInput;
};


export type MutationDownvoteCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationDownvotePostArgs = {
  postId: Scalars['Int'];
};


export type MutationEditCompanyBranchArgs = {
  data: CompanyBranchEditInput;
  id: Scalars['String'];
};


export type MutationEditUserProfileArgs = {
  file?: InputMaybe<Scalars['Upload']>;
  userProfile: UserProfileInput;
};


export type MutationFollowCompanyArgs = {
  data: FollowCompanyInput;
};


export type MutationFollowUserToUserArgs = {
  data: FollowUserToUserInput;
};


export type MutationInviteEmployeeArgs = {
  data: InvitedEmployeeInput;
};


export type MutationInviteUserByCommunityAdminArgs = {
  input: CommunityMemberInviteInput;
};


export type MutationInviteUserByCommunityUserArgs = {
  input: CommunityMemberInviteInput;
};


export type MutationJoinPublicCommunityArgs = {
  input: CommunityMemberInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationLoginLinkAccessArgs = {
  data: LoginLinkAccessInput;
};


export type MutationOtpVerificationArgs = {
  otp: Scalars['Float'];
};


export type MutationPostArgs = {
  companyId: Scalars['String'];
  data: CreatePostInput;
  file?: InputMaybe<Array<Scalars['Upload']>>;
};


export type MutationPostDeleteArgs = {
  postId: Scalars['String'];
};


export type MutationPostUpdateArgs = {
  file?: InputMaybe<Scalars['Upload']>;
  id: Scalars['String'];
  imageURL?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<UpdatePostInput>;
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String'];
};


export type MutationRemoveLikeArgs = {
  postId: Scalars['String'];
};


export type MutationRemoveRatingFromCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationRemoveRatingFromPostArgs = {
  postId: Scalars['Int'];
};


export type MutationReplyToReplyArgs = {
  commentId: Scalars['String'];
  input: CreateCommentInput;
  mention?: InputMaybe<CreateMentionsInput>;
};


export type MutationRequestConfirmEmailArgs = {
  data: RequestConfirmEmailInput;
};


export type MutationRequestResetPasswordArgs = {
  data: RequestResetPasswordInput;
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationSignupArgs = {
  data: SignupInput;
};


export type MutationUnfollowCompanyArgs = {
  data: UnfollowCompanyInput;
};


export type MutationUnfollowUserArgs = {
  data: UnfollowUserInput;
};


export type MutationUpdateCommunityPolicyArgs = {
  id: Scalars['String'];
  input: CommunityPolicyUpdateInput;
};


export type MutationUpdateIndustryArgs = {
  data: IndustryInput;
  id: Scalars['String'];
};


export type MutationUpdateStatusUserArgs = {
  data: UpdateStatusUserInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};


export type MutationUpvoteCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationUpvotePostArgs = {
  postId: Scalars['Int'];
};

export type MutationPayload = {
  errors?: Maybe<Array<UserError>>;
};

export type NewReplyPayload = MutationPayload & {
  __typename?: 'NewReplyPayload';
  comment?: Maybe<Comment>;
  errors?: Maybe<Array<UserError>>;
};

export type Otp = {
  __typename?: 'OTP';
  createdAt: Scalars['DateTime'];
  expirationDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  otp?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
  userId?: Maybe<Scalars['String']>;
};

export type OtpPayload = {
  __typename?: 'OTPPayload';
  errors?: Maybe<Array<CustomError>>;
  otp?: Maybe<Otp>;
  otpCheck?: Maybe<Scalars['Boolean']>;
};

export type OrderCommentsList = {
  direction: OrderDirection;
  orderBy: CommentOrderBy;
};

/** Likely likely to sort a list of items when presented with an argument `orderBy`. */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type OrderFollowedCompanyList = {
  direction: OrderDirection;
  orderBy: FollowedCompanyOrderBy;
};

export type OrderListCommunity = {
  direction: OrderDirection;
  orderBy: CommunityOrderBy;
};

export type OrderListCommunityMember = {
  direction: OrderDirection;
  orderBy: CommunityMemberOrderBy;
};

export type OrderListCompanies = {
  direction: OrderDirection;
  orderBy: CompaniesOrderBy;
};

export type OrderListDiscussion = {
  direction: OrderDirection;
  orderBy: DiscussionOrderBy;
};

export type OrderListDiscussionAnswer = {
  direction: OrderDirection;
  orderBy: DiscussionAnswerOrderBy;
};

export type OrderListUsers = {
  direction: OrderDirection;
  orderBy: UsersOrderBy;
};

export type OrderPosts = {
  direction: OrderDirection;
  orderBy: PostsOrderBy;
};

export type OrderTagList = {
  direction: OrderDirection;
  orderBy: TagOrderBy;
};

export type PaginationArgs = {
  skip: Scalars['Float'];
  take: Scalars['Float'];
};

export type Post = {
  __typename?: 'Post';
  comments: Array<Comment>;
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  creator: User;
  creatorId: Scalars['String'];
  id: Scalars['ID'];
  isSaleAble?: Maybe<Scalars['Boolean']>;
  myRatingStatus: RatingStatus;
  postImage: Array<PostImage>;
  rating: Scalars['Int'];
  tags: Array<Tag>;
  text: Scalars['String'];
};

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Post>;
};

export type PostImage = {
  __typename?: 'PostImage';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageURL?: Maybe<Scalars['String']>;
  metaTitle?: Maybe<Scalars['String']>;
  postId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type PostPageInfo = {
  __typename?: 'PostPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type PostPagination = {
  __typename?: 'PostPagination';
  edges?: Maybe<Array<PostEdge>>;
  pageInfo?: Maybe<PostPageInfo>;
  totalCount?: Maybe<Scalars['Float']>;
};

/** Order by: createdAt */
export enum PostsOrderBy {
  CreatedAt = 'createdAt'
}

export type Query = {
  __typename?: 'Query';
  commentReactions: CommentReactionPaginationPayload;
  comments: CommentPaginationPayload;
  companies: CompanyPaginated;
  companiesSuggestions: CompanyPaginated;
  companyPostsFollowedByUser?: Maybe<PostPagination>;
  discussionVoteCount: Scalars['Float'];
  getBranchesByCompanyId: GetCompanyBranchPayload;
  getCommunity: GetCommunityPayload;
  getCommunityById: CommunityPayload;
  getCommunityMember: GetCommunityMemberPayload;
  getCommunityPolicies: CommunityPoliciesPayload;
  getCommunityPolicy: CommunityPolicy;
  getCompanyById: Company;
  getCompanyDiscussion: DiscussionPaginated;
  getCompanyDiscussionById: CompanyDiscussion;
  getCompanyDiscussionByUser: Array<CompanyDiscussion>;
  getCompanysFollowedByUser?: Maybe<CompanyPaginated>;
  getDiscussionAnswerByDiscussionId: DiscussionAnswerPaginated;
  getIndustry: IndustryPayload;
  getLikesByPost: ReactionsPagination;
  getReactions: Array<Reactions>;
  getTags: TagPagination;
  getUser: User;
  getUsersByPostReaction: ReactionsPagination;
  listUsers: UserPaginated;
  me: User;
  postsByCompanyId: PostPagination;
};


export type QueryCommentReactionsArgs = {
  commentId: Scalars['String'];
  order?: InputMaybe<CommentReactionsOrderList>;
  paginate?: InputMaybe<PaginationArgs>;
};


export type QueryCommentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  order?: InputMaybe<OrderCommentsList>;
  postId: Scalars['String'];
};


export type QueryCompaniesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<FilterListCompanies>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  order?: InputMaybe<OrderListCompanies>;
};


export type QueryCompaniesSuggestionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<FilterListCompanies>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  order?: InputMaybe<OrderListCompanies>;
};


export type QueryCompanyPostsFollowedByUserArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  order?: InputMaybe<OrderPosts>;
};


export type QueryDiscussionVoteCountArgs = {
  discussionId: Scalars['String'];
};


export type QueryGetBranchesByCompanyIdArgs = {
  id: Scalars['String'];
};


export type QueryGetCommunityArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  companyId: Scalars['String'];
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  order?: InputMaybe<OrderListCommunity>;
};


export type QueryGetCommunityByIdArgs = {
  communityId: Scalars['String'];
};


export type QueryGetCommunityMemberArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  communityId: Scalars['String'];
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  order?: InputMaybe<OrderListCommunityMember>;
};


export type QueryGetCommunityPoliciesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  communityId: Scalars['String'];
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
};


export type QueryGetCommunityPolicyArgs = {
  id: Scalars['String'];
};


export type QueryGetCompanyByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetCompanyDiscussionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  companyId: Scalars['String'];
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  order?: InputMaybe<OrderListDiscussion>;
};


export type QueryGetCompanyDiscussionByIdArgs = {
  discussionId: Scalars['String'];
};


export type QueryGetCompanysFollowedByUserArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  order?: InputMaybe<OrderFollowedCompanyList>;
};


export type QueryGetDiscussionAnswerByDiscussionIdArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  discussionId: Scalars['String'];
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  order?: InputMaybe<OrderListDiscussionAnswer>;
};


export type QueryGetLikesByPostArgs = {
  order?: InputMaybe<ReactionsOrderList>;
  paginate?: InputMaybe<PaginationArgs>;
  postId: Scalars['String'];
};


export type QueryGetTagsArgs = {
  order?: InputMaybe<OrderTagList>;
  paginate?: InputMaybe<PaginationArgs>;
  query?: InputMaybe<TagQuery>;
};


export type QueryGetUserArgs = {
  userId: Scalars['String'];
};


export type QueryGetUsersByPostReactionArgs = {
  order?: InputMaybe<ReactionsOrderList>;
  paginate?: InputMaybe<PaginationArgs>;
  reactionType: Scalars['String'];
};


export type QueryListUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<FilterListUsers>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  order?: InputMaybe<OrderListUsers>;
};


export type QueryPostsByCompanyIdArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  id: Scalars['String'];
  last?: InputMaybe<Scalars['Float']>;
};

export type RatePayload = MutationPayload & {
  __typename?: 'RatePayload';
  errors?: Maybe<Array<UserError>>;
  isRateSuccessful: Scalars['Boolean'];
};

export enum RatingStatus {
  Downvoted = 'DOWNVOTED',
  Neutral = 'NEUTRAL',
  Upvoted = 'UPVOTED'
}

export type Reactions = {
  __typename?: 'Reactions';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  reactionType: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

/** Order By:createdAt */
export enum ReactionsOrderBy {
  CreatedAt = 'createdAt'
}

export type ReactionsOrderList = {
  direction: OrderDirection;
  orderBy: ReactionsOrderBy;
};

export type ReactionsPagination = {
  __typename?: 'ReactionsPagination';
  edges?: Maybe<Array<LikesEdge>>;
  hasNextPage: Scalars['Boolean'];
  nodes?: Maybe<Array<Likes>>;
  totalCount: Scalars['Int'];
};

export type Replies = {
  __typename?: 'Replies';
  createdAt: Scalars['DateTime'];
  creator: User;
  creatorId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mentions: Array<User>;
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['String']>;
  repliedTo: Comment;
  repliedToCommentId?: Maybe<Scalars['String']>;
  replies: RepliesToRepliesPagination;
  text?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


export type RepliesRepliesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  order?: InputMaybe<OrderCommentsList>;
};

export type RepliesEdge = {
  __typename?: 'RepliesEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Replies>;
};

export type RepliesPageInfo = {
  __typename?: 'RepliesPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type RepliesPagination = {
  __typename?: 'RepliesPagination';
  edges?: Maybe<Array<RepliesEdge>>;
  pageInfo?: Maybe<RepliesPageInfo>;
  totalCount?: Maybe<Scalars['Float']>;
};

export type RepliesToReplies = {
  __typename?: 'RepliesToReplies';
  createdAt: Scalars['DateTime'];
  creator?: Maybe<User>;
  creatorId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  repliedToCommentId?: Maybe<Scalars['String']>;
  repliedToParentComment?: Maybe<Comment>;
  repliedToReplyId?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type RepliesToRepliesEdge = {
  __typename?: 'RepliesToRepliesEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<RepliesToReplies>;
};

export type RepliesToRepliesPageInfo = {
  __typename?: 'RepliesToRepliesPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type RepliesToRepliesPagination = {
  __typename?: 'RepliesToRepliesPagination';
  edges?: Maybe<Array<RepliesToRepliesEdge>>;
  pageInfo?: Maybe<RepliesToRepliesPageInfo>;
  totalCount?: Maybe<Scalars['Float']>;
};

export type RepliesToRepliesPayload = {
  __typename?: 'RepliesToRepliesPayload';
  errors?: Maybe<Array<CustomError>>;
  replies?: Maybe<RepliesToReplies>;
};

export type ReplyToAnswerInput = {
  answer: Scalars['String'];
  discussionId: Scalars['String'];
  repliedToAnswerId: Scalars['String'];
};

export type ReplyToCommentPayload = {
  __typename?: 'ReplyToCommentPayload';
  errors?: Maybe<Array<CustomError>>;
  replies?: Maybe<Replies>;
};

export type RequestConfirmEmailInput = {
  email: Scalars['String'];
};

export type RequestResetPasswordInput = {
  email: Scalars['String'];
};

export type ResetPasswordInput = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type SignupInput = {
  email: Scalars['String'];
  fullName?: InputMaybe<Scalars['String']>;
  isCompanyAccount?: InputMaybe<Scalars['Boolean']>;
  legalName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type TagEdge = {
  __typename?: 'TagEdge';
  cursor: Scalars['String'];
  node: Tag;
};

/** Order by:createdAt */
export enum TagOrderBy {
  CreatedAt = 'createdAt'
}

export type TagPagination = {
  __typename?: 'TagPagination';
  edges?: Maybe<Array<TagEdge>>;
  hasNextPage: Scalars['Boolean'];
  nodes?: Maybe<Array<Tag>>;
  totalCount: Scalars['Int'];
};

export type TagQuery = {
  name?: InputMaybe<Scalars['String']>;
};

export type Token = {
  __typename?: 'Token';
  /** JWT access token */
  accessToken?: Maybe<Scalars['String']>;
  /** JWT refresh token */
  refreshToken?: Maybe<Scalars['String']>;
};

export type UnfollowCompanyInput = {
  companyId: Scalars['String'];
};

export type UnfollowUserInput = {
  userId: Scalars['String'];
};

export type UpdatePostInput = {
  description?: InputMaybe<Scalars['String']>;
  metaTitle?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  text: Scalars['String'];
};

export type UpdatePostPayload = {
  __typename?: 'UpdatePostPayload';
  errors?: Maybe<Array<CustomError>>;
  post?: Maybe<Post>;
  postImage?: Maybe<PostImage>;
  tags?: Maybe<Array<Tag>>;
};

export type UpdateStatusUserInput = {
  status: Scalars['Boolean'];
  userId: Scalars['String'];
};

export type UpdateUserInput = {
  fullName?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  company?: Maybe<Array<Company>>;
  confirm?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  emailToken?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isAdmin: Scalars['Boolean'];
  isEmailVerified?: Maybe<Scalars['Boolean']>;
  isSuperuser?: Maybe<Scalars['Boolean']>;
  isValid?: Maybe<Scalars['Boolean']>;
  posts?: Maybe<Array<Post>>;
  updatedAt: Scalars['DateTime'];
  userProfile?: Maybe<UserProfile>;
  username?: Maybe<Scalars['String']>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<User>;
};

export type UserEmployeeInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  isInviteAccepted: Scalars['Boolean'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
};

export type UserError = {
  __typename?: 'UserError';
  code?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  status?: Maybe<Scalars['Float']>;
};

export type UserPageInfo = {
  __typename?: 'UserPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type UserPaginated = {
  __typename?: 'UserPaginated';
  edges?: Maybe<Array<UserEdge>>;
  pageInfo?: Maybe<UserPageInfo>;
  totalCount?: Maybe<Scalars['Float']>;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  address?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  phoneNo?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type UserProfileInput = {
  address: Scalars['String'];
  phoneNo: Scalars['String'];
};

export type UserProfilePayload = {
  __typename?: 'UserProfilePayload';
  errors?: Maybe<CustomError>;
  userProfile?: Maybe<UserProfile>;
};

/** Order by: username, createdAt, email */
export enum UsersOrderBy {
  CreatedAt = 'createdAt',
  Email = 'email',
  Username = 'username'
}


      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "MutationPayload": [
      "NewReplyPayload",
      "RatePayload"
    ]
  }
};
      export default result;
    