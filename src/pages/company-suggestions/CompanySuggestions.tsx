import { CompanyEdge } from '@/generated/graphql';
import { useRecommendedCompanies } from '@/hooks/services/useRecommendedCompanies';
import { InfiniteScroller } from '@/shared-components/infinite-scroller';
import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import React from 'react';
import { Box } from 'src/ui-elements/atoms/box';
import useCompanySuggestion from './hooks';

const CompanySuggestion = React.lazy(() => import('./CompanySuggestion'));

const CompanySuggestions = () => {
	const { response, loading, onLoadMore, hasNextPage } = useRecommendedCompanies(20);
	const { onFollow, onUnfollow, onContinue, onSkip, followedCompanies } = useCompanySuggestion();

	const handleFollow = async (companyId: string) => {
		onFollow(companyId);
	};

	const handleUnfollow = async (companyId: string) => {
		onUnfollow(companyId);
	};

	const handleContinue = () => onContinue();

	const handleSkip = () => onSkip();

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
							<LoaderDataComponent isLoading={loading} data={response}>
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
							</LoaderDataComponent>
						</Box>
					</div>
				</div>
			</div>
		</>
	);
};

export default CompanySuggestions;
