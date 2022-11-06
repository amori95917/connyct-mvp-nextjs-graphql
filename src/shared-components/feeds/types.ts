import { Maybe, Post } from '@/generated/graphql';

export type FeedProps = {
	post: Maybe<Post> | undefined;
	name: string;
	isOnSale: boolean;
};
