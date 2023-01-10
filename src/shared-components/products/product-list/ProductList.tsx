import { ProductEdge } from '@/generated/graphql';
import { useProductsByBrandQuery } from '@/hooks/services/useProductsQuery';
import { DataComponent } from '@/shared-components/data-component';
import { InfiniteScroller } from '@/shared-components/infinite-scroller';
import Product from './Product';

type ProductListProps = {
	companySlug: string;
};

const ProductList = (props: ProductListProps) => {
	const { companySlug } = props;
	const { response, hasNextPage, onLoadMore, loading } = useProductsByBrandQuery(companySlug);
	console.log('response', response);
	return (
		<DataComponent data={response}>
			<InfiniteScroller
				loading={loading}
				scrollableTop={true}
				hasNextPage={hasNextPage}
				onLoadMore={onLoadMore}>
				{(response || []).map((postNode: ProductEdge) => {
					const { node } = postNode;
					if (node) {
						return <Product key={node.id} item={node} />;
					}
				})}
			</InfiniteScroller>
		</DataComponent>
	);
};

export default ProductList;
