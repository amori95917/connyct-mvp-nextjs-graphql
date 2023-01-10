import { User } from '@/generated/graphql';
import AddProductDrawer from '@/shared-components/drawers/add-product-drawer/AddProductDrawer';
import ProductList from '@/shared-components/products/product-list/ProductList';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useState } from 'react';

type ProductsProps = {
	companySlug: string;
	authorizedUser: User;
};
const Products = (props: ProductsProps) => {
	const { companySlug } = props;
	const [openDrawer, setOpenDrawer] = useState(false);
	const handleDrawerOpen = () => setOpenDrawer(!openDrawer);
	const handleDrawerClose = () => setOpenDrawer(false);

	return (
		<>
			<div className='flex items-center justify-between px-4'>
				<p className='font-bold'>Products</p>
				<Link href={`/brand/${companySlug}/products/new`}>
					<button className='bg-primary px-4 py-2 rounded text-white' onClick={handleDrawerOpen}>
						Add new product
					</button>
				</Link>
			</div>
			{openDrawer && <AddProductDrawer isDrawerOpen={openDrawer} onDrawerClose={handleDrawerClose} />}
			<div className='flex flex-wrap justify-center'>
				<Suspense fallback={<p>Loading...</p>}>
					<ProductList companySlug={companySlug} />
				</Suspense>
			</div>
		</>
	);
};

export default Products;

const PRODUCTS = [
	{
		id: 1,
		name: 'Product 1',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at enim non sem blandit pretium eu et justo',
		price: '$50',
		image: '/images/product/dri-fit.jpeg',
	},
	{
		id: 2,
		name: 'Product 2',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at enim non sem blandit pretium eu et justo',
		price: '$50',
		image: '/images/product/air.jpeg',
	},
	{
		id: 3,
		name: 'Product 3',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at enim non sem blandit pretium eu et justo',
		price: '$50',
		image: '/images/product/jordan1.jpeg',
	},
	{
		id: 4,
		name: 'Product 4',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at enim non sem blandit pretium eu et justo',
		price: '$50',
		image: '/images/product/tshirt.jpeg',
	},
	{
		id: 5,
		name: 'Product 5',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at enim non sem blandit pretium eu et justo',
		price: '$50',
		image: '/images/product/air.jpeg',
	},
	{
		id: 6,
		name: 'Product 6',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at enim non sem blandit pretium eu et justo',
		price: '$50',
		image: '/images/product/air.jpeg',
	},
	{
		id: 7,
		name: 'Product 7',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at enim non sem blandit pretium eu et justo',
		price: '$50',
		image: '/images/product/jordan1.jpeg',
	},
];
