import CategoryForm from './CategoryForm';
import CategoryTable from './CategoryTable';

const Categories = () => {
	return (
		<>
			<div className='flex'>
				<div className='w-4/12'>
					<CategoryForm />
				</div>
				<div className='w-8/12'>
					<CategoryTable />
				</div>
			</div>
		</>
	);
};

export default Categories;
