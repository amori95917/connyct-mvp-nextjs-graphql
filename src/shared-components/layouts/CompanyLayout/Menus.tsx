import Link from 'next/link';

import {
	UilStore,
	UilPostcard,
	UilCommentsAlt,
	UilShoppingBag,
	UilChannel,
} from '@iconscout/react-unicons';

const downMenusButtonClassNames =
	'group flex items-center p-4 w-full hover:bg-primary hover:text-brandSecondary hover:font-bold hover:first:fill-brandSecondary';
const svgClassNames = 'group-hover:fill-brandSecondary';

const Menus = props => {
	const { data } = props;
	const slug = data?.getCompanyById?.id;

	return (
		<>
			<div className='bg-slate-100 flex no-scrollbar overflow-scroll w-full md:justify-center'>
				<Link href={`/brand/${slug}/about-us`} passHref className='mr-6'>
					<button className={downMenusButtonClassNames}>
						<UilStore size={25} fill={'#5A6399'} className={svgClassNames} />
						<span className='ml-5 whitespace-nowrap'>About us</span>
					</button>
				</Link>
				<Link href={`/brand/${slug}/feeds`} passHref className='mr-6'>
					<button className={downMenusButtonClassNames}>
						<UilPostcard size={25} fill={'#5A6399'} className={svgClassNames} />
						<span className='ml-5'>Feeds</span>
					</button>
				</Link>
				<Link href={`/brand/${slug}/products`} passHref className='mr-6'>
					<button className={downMenusButtonClassNames}>
						<UilShoppingBag size={25} fill={'#5A6399'} className={svgClassNames} />
						<span className='ml-5'>Products</span>
					</button>
				</Link>
				<Link href={`/brand/${slug}/communities`} passHref className='mr-6'>
					<button className={downMenusButtonClassNames}>
						<UilChannel size={25} fill={'#5A6399'} className={svgClassNames} />
						<span className='ml-5'>Communities</span>
					</button>
				</Link>
				<Link href={`/brand/${slug}/discussions`} passHref>
					<button className={downMenusButtonClassNames}>
						<UilCommentsAlt size={25} fill={'#5A6399'} className={svgClassNames} />
						<span className='ml-5'>Discussions</span>
					</button>
				</Link>
				<Link href={`/brand/${slug}/staffs`} passHref>
					<button className={downMenusButtonClassNames}>
						<UilCommentsAlt size={25} fill={'#5A6399'} className={svgClassNames} />
						<span className='ml-5'>Staffs</span>
					</button>
				</Link>
			</div>
		</>
	);
};

export default Menus;
