import { FollowedBrandFeeds } from '@/shared-components/followed-brand-feeds';
import { HeaderLayout } from '@/shared-components/layouts';
import RecommendedBrandsCard from '@/shared-components/recommended-brands-card/RecommendedBrandsCard';
import { UserProfileCard } from '@/shared-components/user-profile-card';

const FeedsPage = () => {
	return (
		<>
			<HeaderLayout>
				<main className='min-h-screen px-4'>
					<div className='flex flex-wrap'>
						<div className='w-full sm:w-full md:w-full lg:w-5/6 xl:w-5/6'>
							<div className='flex flex-wrap-reverse'>
								<div className='px-0 py-2 w-full sm:px-0 sm:w-full md:px-0 md:w-full lg:px-4 lg:w-full xl:px-4 xl:w-4/12'>
									<UserProfileCard />
								</div>
								<div className='px-0 w-full sm:px-0 sm:w-full sm:w-w-8/12 md:px-0 md:w-full lg:px-4 xl:px-4 xl:w-8/12'>
									<FollowedBrandFeeds />
								</div>
							</div>
						</div>
						<div className='px-0 py-2 w-full sm:px-0 sm:w-full md:px-0 md:w-full lg:px-4 lg:w-1/6 xl:px-4 xl:w-1/6'>
							<section className='sticky top-100'>
								<div className='bg-white max-h-80 mb-4 overflow-y-auto rounded-lg shadow w-full'>
									<div className='border-b-2 border-slate-100 px-3 py-3 shadow-sm'>
										<div className='flex items-center'>
											<span className='font-bold text-lg text-primary'>Brands you may know</span>
										</div>
										<RecommendedBrandsCard />
									</div>
								</div>
								<section className='bg-white max-h-64 mb-4 rounded-lg shadow w-full'>
									<div className='border-b-2 border-slate-100 px-4 py-3 shadow-sm'>
										<div className='flex items-center'>
											<span className='font-bold text-lg text-primary'>Evangelists you may know</span>
										</div>
									</div>
								</section>
							</section>
						</div>
					</div>
				</main>
			</HeaderLayout>
		</>
	);
};

export default FeedsPage;
