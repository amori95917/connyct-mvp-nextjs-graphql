import React, { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
	DashboardIcon,
	OrderIcon,
	CustomerIcon,
	SalesIcon,
	UsersIcon,
	CompanyIcon,
	UpArrowIcon,
	DownArrowIcon,
} from '@/ui-elements/atoms/icons';
import { Navbar } from '@/shared-components/navbar';

const SIDEBAR_MENUS = [
	{ id: 1, name: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
	{
		id: 2,
		name: 'Company Management',
		href: '/dashboard/company-management',
		icon: <CompanyIcon width='1.4em' height='1.4em' />,
		children: [
			{ id: 1, name: 'Hierarchy', href: '/hierarchy' },
			{ id: 2, name: 'Staff Setup', href: '/staff' },
		],
	},
	{
		id: 3,
		name: 'Product Management',
		href: '/dashboard/product-management',
		icon: <OrderIcon />,
		children: [
			{ id: 1, name: 'Product view', href: '/products' },
			{ id: 2, name: 'Categories', href: '/categories' },
			{ id: 3, name: 'Attributes', href: '/attributes' },
			{ id: 4, name: 'Collections', href: '/collections' },
			{ id: 5, name: 'Inventory', href: '/inventory' },
		],
	},
	// { id: 4, name: 'Sales Management', href: '/dashboard/sales-management', icon: <SalesIcon /> },
	// { id: 5, name: 'Order Management', href: '/dashboard/order-management', icon: <OrderIcon /> },
	// {
	// 	id: 6,
	// 	name: 'Customer Statistics',
	// 	href: '/dashboard/customer-statistics',
	// 	icon: <CustomerIcon />,
	// },
	// {
	// 	id: 7,
	// 	name: 'Supplier Management',
	// 	href: '/dashboard/supplier-management',
	// 	icon: <SalesIcon />,
	// },
	// { id: 8, name: 'User Analytics', href: '/dashboard/user-analytics', icon: <UsersIcon /> },
];

const resolveLinkPath = (childTo, parentTo) => `${parentTo}${childTo}`;

const SideMenuHeader = ({ menu }) => {
	const { name, href: headerToPath, children, icon } = menu;
	const router = useRouter();
	const [expanded, setExpand] = useState(router.pathname.includes(headerToPath));
	const onExpandChange = e => {
		e.preventDefault();
		setExpand(expanded => !expanded);
	};
	return (
		<>
			<div
				className='block font-medium mt-3 px-4 py-3 text-base text-gray-600 hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:text-gray-900'
				onClick={onExpandChange}>
				<span className='flex justify-between'>
					<MenuItem name={name} icon={icon} />
					<span className='ml-4'>{expanded ? <UpArrowIcon /> : <DownArrowIcon />}</span>
				</span>
			</div>
			{expanded && (
				<div className='menu-child'>
					{children.map((child, index) => {
						const key = `${child.label}-${index}`;
						const { name, children, href, icon } = child;
						if (children) {
							return (
								<SideMenuHeader key={key} menu={{ ...child, href: resolveLinkPath(href, menu.href) }} />
							);
						}
						return (
							<Link
								href={resolveLinkPath(href, menu.href)}
								key={key}
								passHref
								className='block font-medium mt-3 px-6 py-3 text-base text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:text-gray-900'>
								<span className='flex'>
									<span className='mr-4'>{icon}</span>
									<span>{name}</span>
								</span>
							</Link>
						);
					})}
				</div>
			)}
		</>
	);
};

const MenuItem = ({ icon, name }) => {
	return (
		<span className='flex'>
			{icon && <span className='mr-4'>{icon}</span>}
			<span>{name}</span>
		</span>
	);
};

const SideMenu = ({ menu }) => {
	const { id, name, href, children, icon } = menu;
	if (children) return <SideMenuHeader menu={menu} />;
	return (
		<>
			<Link
				href={href}
				key={`${name}-${id}`}
				className='block font-medium mt-3 px-4 py-3 text-base text-gray-600 hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:text-gray-900'
				passHref>
				<MenuItem name={name} icon={icon} />
			</Link>
		</>
	);
};

const DashboardLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Navbar />
			<div className='bg-white flex h-screen mt-20 overflow-y-hidden'>
				{/* <aside className='-translate-x-full bg-light-bg border-r fixed flex flex-col flex-shrink-0 inset-y-0 max-h-screen overflow-hidden transform transition-all w-64 z-10 lg:static lg:translate-x-0 lg:w-16 lg:z-auto'>
					<div className='flex flex-shrink-0 items-center justify-between p-2 lg:justify-center'>
						<span className='font-semibold leading-8 p-2 text-4xl tracking-wider uppercase whitespace-nowrap'>
							Connyct
						</span>
					</div>
				</aside> */}
				<aside className='-translate-x-full bg-white border-gray-400 border-r-[1px] fixed flex flex-col flex-shrink-0 inset-y-0 max-h-screen overflow-hidden shadow-sm transform transition-all w-80 z-10 lg:static lg:translate-x-0 lg:w-96 lg:z-auto'>
					<nav className='flex-grow pb-4 px-4 md:block md:overflow-y-auto md:pb-0'>
						{SIDEBAR_MENUS.map(sideMenu => {
							return <SideMenu key={sideMenu.id} menu={sideMenu} />;
						})}
					</nav>
				</aside>
				<div className='content flex flex-1 flex-col h-full overflow-hidden'>{children}</div>
			</div>
		</>
	);
};

export default DashboardLayout;
