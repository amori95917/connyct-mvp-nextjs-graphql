import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GiEarthAfricaEurope } from 'react-icons/gi';

type CommunityHeadProps = {
	coverImage: string;
	profileImage: string;
	communityName: string;
	groupStatus: string;
	members: string;
	companySlug: string | undefined;
	communitySlug: string | undefined;
};
export const CommunityHead = (props: CommunityHeadProps) => {
	const NavButtonClassName = 'cursor-pointer p-2 pr-6 hover:bg-gray-200 rounded-md';
	const defaultNavClass = `cursor-pointer p-2 pr-6 text-primary`;
	const {
		coverImage,
		profileImage,
		communityName,
		groupStatus,
		members,
		companySlug,
		communitySlug,
	} = props;
	const router = useRouter();
	const navPath = router.pathname.split('/')[5];
	return (
		<>
			<div className='bg-white flex flex-col rounded-md w-full'>
				<div className='p-5'>
					<div className='bg-white flex pl-10 w-full'>
						<div className='-top-7 border-4 border-solid border-white h-20 relative rounded-full w-20'>
							<Image
								src={profileImage}
								alt='community'
								width={20} // required
								height={20} // required
								// change to suit your needs
								className='rounded-full'
							/>
						</div>

						<div className='flex flex-col grow px-7 py-7'>
							<div>
								<span className='font-bold text-3xl'>{communityName}</span>
							</div>
							<div className='flex items-center'>
								<span>
									<GiEarthAfricaEurope size={20} />
								</span>
								<span className='pl-1 text-lg'>{groupStatus}</span>
								<span className='pl-1 text-lg'>{members} members</span>
							</div>
						</div>
						<div className=''>
							<div className='relative top-7'>
								<button className='bg-primary font-bold p-2 px-6 rounded-md text-lg text-white'>
									Join Community
								</button>
								{/* invite button */}
								{/* <button className='bg-primary font-bold ml-2 p-2 px-6 rounded-md text-lg text-white'>
									Invite
								</button> */}
							</div>
						</div>
					</div>
				</div>
				<hr className='bg-gray-100 border-0 h-px mb-4 pl-10 dark:bg-gray-700' />
				{/* group navigation */}
				<div className='p-2 text-bold'>
					<div className='flex pl-10'>
						<Link href={'/company/${companySlug}/communities/${communitySlug}'} passHref>
							<span className={navPath === undefined ? defaultNavClass : NavButtonClassName}>Home</span>
						</Link>
						<Link href={'/company/${companySlug}/communities/${communitySlug}/posts'} passHref>
							<span className={navPath === 'posts' ? defaultNavClass : NavButtonClassName}>Posts</span>
						</Link>
						<Link href={'/company/${companySlug}/communities/${communitySlug}/members'} passHref>
							<span className={navPath === 'members' ? defaultNavClass : NavButtonClassName}>Members</span>
						</Link>
						<Link href={'/company/${companySlug}/communities/${communitySlug}/policy'} passHref>
							<span className={navPath === 'policy' ? defaultNavClass : NavButtonClassName}>Policy</span>
						</Link>
						<Link href={'/company/${companySlug}/communities/${communitySlug}/about'} passHref>
							<span className={navPath === 'about' ? defaultNavClass : NavButtonClassName}>About</span>
						</Link>
					</div>
				</div>
				{/* group posts */}
			</div>
		</>
	);
};
