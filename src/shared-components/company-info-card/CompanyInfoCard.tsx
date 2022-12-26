import { Company } from '@/generated/graphql';
import { useCurrentUser } from '@/hooks/services/useCurrentUserQuery';
import { UilMedal } from '@iconscout/react-unicons';
import { Avatar } from '../avatar';

const slateSecondaryClassNames = 'text-slate-400';
const boldSecondaryTextClassNames = 'font-bold text-xl';
const spanContainerClassNames = 'flex flex-col items-center';

const CompanyInfoCard = ({ companySlug = '', data }: { companySlug: string; data: any }) => {
	const totalFollowers = data?.getCompanyById?.followers ? data?.getCompanyById?.followers : '0';
	const totalSales = data?.getCompanyById?.totalSales ? data?.getCompanyById?.totalSales : '0';
	const totalPosts = data?.getCompanyById?.totalPost ? data?.getCompanyById?.totalPost : '0';
	const { currentUser } = useCurrentUser();

	const showConnectOrDisconnect = () => {
		return data?.getCompanyById?.hasFollowedByUser ? 'Disconnect' : 'Connect';
	};

	const hasCompanySlugMatched = (brandIdToMatch: string, brand: [Company]) => {
		return brand.some(b => b.id === brandIdToMatch);
	};

	const hasOwnerIdMatched = (ownerIdToMatch: string, brand: [Company]) => {
		return brand.some(b => b.ownerId === ownerIdToMatch);
	};

	const showProfileButton = () => {
		return (
			currentUser?.activeRole.name === 'OWNER' &&
			hasCompanySlugMatched(companySlug, currentUser?.company) &&
			hasOwnerIdMatched(currentUser?.id, currentUser?.company)
		);
	};
	// TODO need to check from this api, is the account is verified or not ??
	return (
		<div className='flex flex-col items-center mr-5 no-scrollbar overflow-y-scroll rounded-md md:h-screen md:sticky md:top-24'>
			<div className='bg-white rounded-md w-full'>
				<div className='p-5'>
					<div className='bg-gray-100 flex flex-col p-3 rounded-md'>
						<div className='flex items-center'>
							<div className='h-16 relative rounded-full w-16'>
								<Avatar
									imgSrc={data?.getCompanyById?.avatar}
									name={data?.getCompanyById?.name}
									alt={data?.getCompanyById?.name}
									className='rounded-full'
									size='md'
								/>
							</div>
							{/* TODO need to change visitor by using the graphql call */}
							<div className='flex flex-col pl-1'>
								<div className='flex font-bold h-fit items-center'>
									<p className='font-bold text-lg'>{data?.getCompanyById?.legalName}</p>
									<span className='ml-2'>
										<UilMedal fill={`${data?.getCompanyById?.isVerified ? '#5A6399' : '#9ca3af'}`} />
									</span>
								</div>
								<span className={`font-bold text-primary`}>{data?.getCompanyById?.name}</span>
							</div>
						</div>
						<div className='flex justify-around mt-5 w-full'>
							<span className={spanContainerClassNames}>
								<span className={boldSecondaryTextClassNames}>{totalFollowers}</span>
								<span className={slateSecondaryClassNames}>Followers</span>
							</span>
							<span className={spanContainerClassNames}>
								<span className={boldSecondaryTextClassNames}>{totalSales}</span>
								<span className={slateSecondaryClassNames}>Sales</span>
							</span>
							<span className={spanContainerClassNames}>
								<span className={boldSecondaryTextClassNames}>{totalPosts}</span>
								<span className={slateSecondaryClassNames}>Posts</span>
							</span>
						</div>
					</div>
				</div>
				<div className='actions ml-5 mr-5 py-2'>
					<div className='align-center flex justify-between'>
						<button className='bg-gray-100 font-semibold px-10 py-3'>Contact</button>
						{currentUser?.activeRole.name === 'USER' && (
							<button
								className={`${
									showConnectOrDisconnect() ? 'bg-brandSecondary' : 'bg-primary'
								} font-semibold px-10 py-3 text-white`}>
								{showConnectOrDisconnect()}
							</button>
						)}
						{showProfileButton() && (
							<button className='bg-primary font-semibold px-10 py-3 text-white'>Edit Profile</button>
						)}
					</div>
				</div>
				<div className='py-4 rating-section'>
					<div className='bg-slate-200 h-px ml-5 mr-5 mt-3'></div>
					<div className='py-5 rating text-center'>
						<span className='font-bold text-3xl text-primary'>4.5/5</span>
						<span className='ml-1 text-gray-500'>Satisfied</span>
					</div>
					<div className='bg-slate-200 h-px ml-5 mr-5 mt-3'></div>
				</div>
			</div>
		</div>
	);
};

export { CompanyInfoCard };
