import Info from '@/pages/dashboard/commons/info';
import { Tabs } from '@/ui-elements/tabs';

import Products from './Products';
import ProductSetup from './product-setup';

const ProductWrapper = () => {
	return (
		<>
			<Info
				title='Product Management'
				description='In the product management, you can add products, list products, edit and delete products.
						Product can be created with multiple attributes and variants. Pricing are based on variants.
						you can add products, list products, edit and delete products.Product can be created with
						multiple attributes and variants. Pricing are based on variants'
			/>
			<div className='body h-screen overflow-y-auto pt-4'>
				<Tabs initialActiveTab='all-products'>
					<ul className='border-b-2 border-gray-400 border-solid border-t-transparent border-x-transparent flex'>
						<li className='cursor-pointer font-semibold py-2'>
							<Tabs.Tab label='all-products'>All Products</Tabs.Tab>
						</li>
						<li className='cursor-pointer font-semibold px-4 py-2'>
							<Tabs.Tab label='active-products'>Active</Tabs.Tab>
						</li>
						<li className='cursor-pointer font-semibold px-4 py-2'>
							<Tabs.Tab label='draft-products'>Drafts</Tabs.Tab>
						</li>
						<li className='cursor-pointer font-semibold px-4 py-2'>
							<Tabs.Tab label='product-setup'>+ Add New Product </Tabs.Tab>
						</li>
					</ul>
					<Tabs.Panel label='all-products'>
						<Products />
					</Tabs.Panel>
					<Tabs.Panel label='active-products'>
						<Products />
					</Tabs.Panel>
					<Tabs.Panel label='draft-products'>
						<Products />
					</Tabs.Panel>
					<Tabs.Panel label='product-setup'>
						<ProductSetup />
					</Tabs.Panel>
				</Tabs>
			</div>
		</>
	);
};

export default ProductWrapper;
