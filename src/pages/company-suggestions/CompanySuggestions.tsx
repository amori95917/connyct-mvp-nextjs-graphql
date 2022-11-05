import { useRecommendedCompanies } from '@/hooks/services/useRecommendedCompanies';
import { Box } from '@/components/atoms/box';
import { CompanyEdge } from '@/generated/graphql';
import { InfiniteScroller } from '@/shared-components/infinite-scroller';
import CompanySuggestion from './CompanySuggestion';
import useCompanySuggestion from './hooks';

const CompanySuggestions = () => {
	const { response, loading, onLoadMore, hasNextPage } = useRecommendedCompanies();
	const { onFollow, onUnfollow, onContinue, onSkip, followedCompanies } = useCompanySuggestion();

	const handleFollow = async (companyId: string) => {
		onFollow(companyId);
	};

	const handleUnfollow = async (companyId: string) => {
		onUnfollow(companyId);
	};

	const handleContinue = () => onContinue();

	const handleSkip = () => onSkip();

	// const [followedCompanies, setFollowedCompanies] = useState<string[]>([]);

	// const [followCompany] = useMutation(FOLLOW_COMPANY);
	// const [unfollowCompany] = useMutation(UNFOLLOW_COMPANY);

	// const handleFollow = async (companyId: string) => {
	// 	const response = await followCompany({
	// 		variables: {
	// 			data: {
	// 				followedToId: companyId,
	// 			},
	// 		},
	// 	});
	// 	const followedCompanyId = response.data.followCompany.followedToId;
	// 	if (!followedCompanies.includes(followedCompanyId)) {
	// 		setFollowedCompanies([...followedCompanies, followedCompanyId]);
	// 	} else setFollowedCompanies(followedCompanies.filter(item => item != followedCompanyId));
	// };

	// const handleUnfollow = async (companyId: string) => {
	// 	await unfollowCompany({
	// 		variables: {
	// 			data: {
	// 				companyId,
	// 			},
	// 		},
	// 	});
	// 	setFollowedCompanies(followedCompanies.filter(item => item != companyId));
	// };

	// const handleContinue = () => {
	// 	location.href = `/feeds`;
	// };

	// const handleSkip = () => {
	// 	location.href = `/feeds`;
	// };
	return (
		<>
			<div className='container flex mx-auto px-5'>
				<div className='col-span-5 grow p-5 pb-10 questionnaires rounded-md'>
					<div className='flex justify-center px-6'>
						<Box className='p-4 w-full md:w-1/2'>
							<div className='flex items-center justify-center mb-5'>
								<div className='flex flex-col items-center w-full md:flex-row md:justify-between'>
									<div>
										<span className='font-bold text-xl'>Recommended Brands</span>
									</div>
									<div className='flex'>
										<button
											disabled={followedCompanies.length !== 0}
											onClick={handleSkip}
											className={`${
												followedCompanies.length === 0 ? 'bg-primary' : 'bg-gray-200'
											}  px-5 py-2 rounded-md text-white w-28`}>
											Skip
										</button>
										<button
											disabled={followedCompanies.length === 0}
											onClick={handleContinue}
											className={`${
												followedCompanies.length === 0 ? 'bg-gray-200' : 'bg-primary'
											} px-5 py-2 rounded-md ml-2 text-white w-28`}>
											Continue
										</button>
									</div>
								</div>
							</div>
							<div className='bg-slate-100 h-px'></div>
							<div className='mx-auto'></div>
							<InfiniteScroller
								loading={loading}
								scrollableTop={true}
								hasNextPage={hasNextPage}
								onLoadMore={onLoadMore}>
								{(response || []).map((suggestedCompany: CompanyEdge) => {
									const { node: company } = suggestedCompany;
									return (
										<CompanySuggestion
											key={company?.id}
											company={company}
											followedCompanies={followedCompanies}
											handleFollow={handleFollow}
											handleUnfollow={handleUnfollow}
										/>
									);
								})}
							</InfiniteScroller>
						</Box>
					</div>
				</div>
			</div>
		</>
	);
};

export default CompanySuggestions;
