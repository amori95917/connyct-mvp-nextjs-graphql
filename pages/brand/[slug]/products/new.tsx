import { useRouter } from 'next/router';

import { AuthorizationWrapper } from '@/shared-components/authorization-wrapper';
import { Header } from '@/shared-components/header';
import { Navbar } from '@/shared-components/navbar';
import { ProductForm } from '@/shared-components/products/product-form';
import { getSlug } from '@/utils/getSlug';

const ProductNewPage = () => {
	const router = useRouter();
	const { slug } = router.query;
	let companySlug = getSlug(slug);

	return (
		<>
			<AuthorizationWrapper allowedRoles={['USER', 'OWNER']}>
				{authorizedUser => {
					if (authorizedUser) {
						return (
							<>
								{authorizedUser?.activeRole?.name === 'USER' ? <Header /> : <Navbar />}
								{companySlug && (
									<div className='bg-white'>
										<ProductForm authorizedUser={authorizedUser} companySlug={companySlug} />
									</div>
								)}
							</>
						);
					}
					return <p>You do not have access to this page.</p>;
				}}
			</AuthorizationWrapper>
		</>
	);
};

export default ProductNewPage;
