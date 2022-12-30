import { useMutation } from '@apollo/client';
import produce from 'immer';

// API SERVICES
import { useCompanyFeedsQuery } from '@/hooks/services/useCompanyFeedsQuery';
// LOCAL COMPONENTS
import { Company, PostEdge } from '@/generated/graphql';
import { CREATE_POST } from '@/graphql/company';
import { GET_COMPANY_POST } from '@/graphql/feeds';
import { useCurrentUser } from '@/hooks/services/useCurrentUserQuery';
import CreatePost from '@/shared-components/create-post/CreatePost';
import { BrandFeeds } from '@/shared-components/feed-components/brand-feeds';
import { InfiniteScroller } from '@/shared-components/infinite-scroller';
import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { FeedLoader } from '@/shared-components/skeleton-loader/FeedLoader';
import { TrendingTopics } from '@/shared-components/trending-topics';
import { BrandRecommendations } from '@/shared-components/widgets/brand-recommendation';
import Widget from '@/shared-components/widgets/Widget';
import { getCookie } from '@/utils/cookies';

type CompanyFeedsProps = {
	companySlug: string;
};

const CompanyFeeds = (props: CompanyFeedsProps) => {
	const { companySlug } = props;
	const { feeds, loading, hasNextPage, onLoadMore } = useCompanyFeedsQuery(companySlug, 10);
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

	const hasCompanySlugMatched = (brandIdToMatch: string, brand: [Company]) => {
		return brand.some(b => b.id === brandIdToMatch);
	};

	const hasOwnerIdMatched = (ownerIdToMatch: string, brand: [Company]) => {
		return brand.some(b => b.ownerId === ownerIdToMatch);
	};

	const isOwner = () => {
		{
			/* MANAGER, EDITOR can also view it where we need to check brandId and currentUser company id are same */
		}
		return (
			currentUser?.activeRole.name === 'OWNER' &&
			hasCompanySlugMatched(companySlug, currentUser?.company) &&
			hasOwnerIdMatched(currentUser?.id, currentUser?.company)
		);
	};

	return (
		<>
			<div className='gap-4 grid md:grid-cols-3'>
				<div className='col-span-2'>
					<div className='flex flex-col'>
						{isOwner() && (
							<div className='mb-10'>
								<CreatePost
									actions={['media', 'events', 'products']}
									onPostSubmit={onPostSubmit}
									authorizedUser={currentUser}
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
										return <BrandFeeds key={node.id} items={node} />;
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
						<Widget>
							<BrandRecommendations first={4} />
						</Widget>
					</div>
				</div>
			</div>
		</>
	);
};

export default CompanyFeeds;
