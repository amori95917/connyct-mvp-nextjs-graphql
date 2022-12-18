// API SERVICES
import { useCompanyFeedsQuery } from '@/hooks/services/useCompanyFeedsQuery';
// LOCAL COMPONENTS
import { CompanyRecommendation } from '@/shared-components/company-recommendation';
import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { BrandFeeds } from '@/shared-components/feed-components/brand-feeds';
import { FeedLoader } from '@/shared-components/skeleton-loader/FeedLoader';
import { InfiniteScroller } from '@/shared-components/infinite-scroller';
import { TrendingTopics } from '@/shared-components/trending-topics';
import CreatePost from '@/shared-components/create-post/CreatePost';
import { PostEdge } from '@/generated/graphql';
import { useCurrentUser } from '@/hooks/services/useCurrentUserQuery';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '@/graphql/company';
import { GET_COMPANY_POST } from '@/graphql/feeds';
import { getCookie } from '@/utils/cookies';
import produce from 'immer';

type CompanyFeedsProps = {
	companySlug: string;
};

const CompanyFeeds = (props: CompanyFeedsProps) => {
	const { companySlug } = props;
	const { feeds, loading, hasNextPage, onLoadMore } = useCompanyFeedsQuery(companySlug);
	const [post, { error, loading: postLoading, data }] = useMutation(CREATE_POST);
	const { currentUser } = useCurrentUser();

	// TODO move this logic to service repository pattern
	const onPostSubmit = async (input: any, cb?: () => void) => {
		const { company } = getCookie('CONNYCT_USER');
		const { tags = [], images = [], ...rest } = input;
		const tempTags = tags
			? tags?.map(tag => {
					return tag.value;
			  })
			: [];
		try {
			const response = await post({
				variables: {
					companyId: company[0].id,
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
						variables: { id: company[0].id, first: 10 },
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
						variables: { id: company[0].id, first: companyPosts?.postsByCompanyId?.edges.length + 1 },
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
						<div className='mb-10'>
							<CreatePost
								actions={['media', 'events', 'products']}
								onPostSubmit={onPostSubmit}
								currentUser={currentUser}
							/>
						</div>
						<LoaderDataComponent isLoading={loading} data={feeds} fallback={<FeedLoader />}>
							<InfiniteScroller
								loading={loading}
								scrollableTop={true}
								hasNextPage={hasNextPage}
								onLoadMore={onLoadMore}>
								{(feeds || []).map((postNode: PostEdge) => {
									const { node } = postNode;
									if (node) {
										return <BrandFeeds key={node.id} items={node} />;
									}
								})}
							</InfiniteScroller>
						</LoaderDataComponent>
					</div>
				</div>
				<div className='widgets'>
					<div className='flex flex-col h-full sticky top-24 w-full'>
						<TrendingTopics />
						{/* TODO: if a user is viewing a company profile then show CompanyRecommendation else different things */}
						<CompanyRecommendation />
					</div>
				</div>
			</div>
		</>
	);
};

export default CompanyFeeds;
