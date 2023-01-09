import { Maybe, Post } from '@/generated/graphql';

export type FeedProps = {
	post: Post;
	name: string;
	isOnSale: boolean;
};
