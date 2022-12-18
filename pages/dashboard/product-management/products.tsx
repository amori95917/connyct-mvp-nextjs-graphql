import Products from '@/pages/dashboard/product-management/products';
import { DashboardLayout } from '@/shared-components/layouts';

const ProductsPage = () => {
	return (
		<DashboardLayout>
			<Products />
		</DashboardLayout>
	);
};

export default ProductsPage;
