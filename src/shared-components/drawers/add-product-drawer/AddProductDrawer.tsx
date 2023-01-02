import { ProductForm } from '@/shared-components/products/product-form';
import CloseIcon from '@/ui-elements/atoms/icons/CloseIcon';
import { Drawer } from '@/ui-elements/drawer';

type AddProductDrawerProps = {
	isDrawerOpen: boolean;
	onDrawerClose: () => void;
};

const AddProductDrawer = (props: AddProductDrawerProps) => {
	const { isDrawerOpen, onDrawerClose } = props;
	return (
		<Drawer
			size='full'
			direction='bottom'
			isOpen={isDrawerOpen}
			onClose={onDrawerClose}
			wrapperClassName='mt-14 border-[1px] border-solid border-bg-slate-50'
			contentClassName='overflow-y-auto'>
			{isOpen => (
				<>
					{isOpen && (
						<div className='container mx-auto'>
							<div className='flex justify-between'>
								<h1 className='flex-1 font-bold self-center text-3xl text-center text-primary'>
									Create a new product
								</h1>
								<CloseIcon className='cursor-pointer h-10 w-10' onClick={onDrawerClose} />
							</div>
							<div className='mt-10'>
								<ProductForm />
							</div>
						</div>
					)}
				</>
			)}
		</Drawer>
	);
};

export default AddProductDrawer;
