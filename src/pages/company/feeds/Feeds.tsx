import { useMutation } from '@apollo/client';
import produce from 'immer';

// API SERVICES
import { useCompanyFeedsQuery } from '@/hooks/services/useCompanyFeedsQuery';
// LOCAL COMPONENTS
import { PostEdge, User } from '@/generated/graphql';
import { CREATE_POST } from '@/graphql/company';
import { GET_COMPANY_POST } from '@/graphql/feeds';
import CreatePost from '@/shared-components/create-post/CreatePost';
import { BrandFeeds } from '@/shared-components/feed-components/brand-feeds';
import { InfiniteScroller } from '@/shared-components/infinite-scroller';
import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { FeedLoader } from '@/shared-components/skeleton-loader/FeedLoader';
import { TrendingTopics } from '@/shared-components/trending-topics';
import { BrandRecommendations } from '@/shared-components/widgets/brand-recommendation';
import Widget from '@/shared-components/widgets/Widget';
import { isOwner } from '@/utils/permissions';

type CompanyFeedsProps = {
	companySlug: string;
	authorizedUser: User;
};

const CompanyFeeds = (props: CompanyFeedsProps) => {
	const { companySlug, authorizedUser } = props;
	const { feeds, loading, hasNextPage, onLoadMore } = useCompanyFeedsQuery(companySlug, 10);
	const [post, { error, loading: postLoading, data }] = useMutation(CREATE_POST);

	// TODO move this logic to service repository pattern
	const onPostSubmit = async (input: any, cb?: () => void) => {
		const { tags = [], images = [], ...rest } = input;
		const tempTags = tags
			? tags?.map(tag => {
					return tag.value;
			  })
			: [];
		try {
			const response = await post({
				variables: {
					companyId: authorizedUser?.company[0].id,
					data: {
						text: input.status,
						tags: tempTags || [],
					},
					file: input.images,
				},

				update: (cache, { data: { post } }) => {
					// post.post
					const companyPosts = cache.readQuery({
						query: GET_COMPANY_POST,
						variables: { id: authorizedUser?.company[0].id, first: 10 },
					});
					const updatedCompanyPosts = produce(companyPosts, (draft: any) => {
						if (draft?.postsByCompanyId?.edges) {
							draft.postsByCompanyId.edges.push({
								__typename: 'PostEdge',
								cursor: post.post.id,
								node: {
									...post.post,
									comments: [],
								},
							});
						}
					});
					cache.writeQuery({
						query: GET_COMPANY_POST,
						variables: {
							id: authorizedUser?.company[0].id,
							first: companyPosts?.postsByCompanyId?.edges.length + 1,
						},
						data: updatedCompanyPosts,
					});
				},
			});
			cb?.();
		} catch (err) {}
	};

	return (
		<>
			<div className='gap-4 grid md:grid-cols-3'>
				<div className='col-span-2'>
					<div className='flex flex-col'>
						{isOwner(authorizedUser, companySlug) && (
							<div className='mb-10'>
								<CreatePost
									actions={['media', 'events', 'products']}
									onPostSubmit={onPostSubmit}
									authorizedUser={authorizedUser}
								/>
							</div>
						)}
						<LoaderDataComponent isLoading={loading} data={feeds} fallback={<FeedLoader />}>
							<InfiniteScroller
								loading={loading}
								scrollableTop={true}
								hasNextPage={hasNextPage}
								onLoadMore={onLoadMore}>
								{(feeds || []).map((postNode: PostEdge) => {
									const { node } = postNode;
									if (node) {
										return <BrandFeeds key={node.id} items={node} authorizedUser={authorizedUser} />;
									}
								})}
							</InfiniteScroller>
						</LoaderDataComponent>
					</div>
				</div>
				<div className='widgets'>
					<div className='flex flex-col mb-4 w-full'>
						<TrendingTopics />
					</div>
					<div className='flex flex-col w-full'>
						{/* TODO: if a user is viewing a company profile then show CompanyRecommendation else different things */}
						<Widget widgetClassName='pt-2 p-4'>
							<p className='font-bold text-lg text-primary'>Recommended Brands</p>
							<BrandRecommendations first={4} />
						</Widget>
					</div>
				</div>
			</div>
		</>
	);
};

export default CompanyFeeds;
