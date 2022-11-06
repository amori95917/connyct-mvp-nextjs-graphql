import Link from 'next/link';

import { SiAboutdotme } from 'react-icons/si';
import { BiWalletAlt } from 'react-icons/bi';
import { MdOutlineExplore } from 'react-icons/md';
import { BsCalendar4Event } from 'react-icons/bs';

const downMenusButtonClassNames = 'flex items-center p-4 w-full hover:bg-primary hover:text-white';

const Menus = props => {
	const { data } = props;
	const slug = data?.getCompanyById?.id;
	return (
		<>
			<div className='bg-white flex w-full'>
				<Link href={`/company/${slug}/about-us`} passHref className='mr-6'>
					<button className={downMenusButtonClassNames}>
						<SiAboutdotme size={25} fill={'#00E0FF'} />
						<span className='ml-5'>About us</span>
					</button>
				</Link>
				<Link href={`/company/${slug}/feeds`} passHref className='mr-6'>
					<button className={downMenusButtonClassNames}>
						<BiWalletAlt size={25} fill={'#00E0FF'} />
						<span className='ml-5'>Feeds</span>
					</button>
				</Link>
				<Link href={`/company/${slug}/products`} passHref className='mr-6'>
					<button className={downMenusButtonClassNames}>
						<MdOutlineExplore size={25} width={1} fill={'#00E0FF'} />
						<span className='ml-5'>Products</span>
					</button>
				</Link>
				<Link href={`/company/${slug}/communities`} passHref className='mr-6'>
					<button className={downMenusButtonClassNames}>
						<MdOutlineExplore size={25} width={1} fill={'#00E0FF'} />
						<span className='ml-5'>Communities</span>
					</button>
				</Link>
				<Link href={`/company/${slug}/communities`} passHref className='mr-6'>
					<button className={downMenusButtonClassNames}>
						<BsCalendar4Event size={25} fill={'#00E0FF'} />
						<span className='ml-5'>Events</span>
					</button>
				</Link>
				<Link href={`/company/${slug}/promotions`} passHref>
					<button className={downMenusButtonClassNames}>
						<BsCalendar4Event size={25} fill={'#00E0FF'} />
						<span className='ml-5'>Promotions</span>
					</button>
				</Link>
			</div>
		</>
	);
};

export default Menus;