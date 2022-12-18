import useProductTable from './hooks/useProductTable';
import ProductTable from './ProductTable';

const Products = () => {
	const { columns, data } = useProductTable();
	return (
		<>
			<ProductTable columns={columns} data={data} />
		</>
	);
};

export default Products;
