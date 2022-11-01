import React, { FC, ReactNode } from 'react';
import { ConnyctLogo } from '@/shared-components/icons';
import { ProductPostForm } from './product-post-form';

// need to make this component reusable if any more drawers are needed
type ProductPostDrawerType = {
	children: ReactNode;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
};

export const ProductPostDrawer: FC<ProductPostDrawerType> = ({ children, isOpen, setIsOpen }) => {
	const onCloseHandler = () => {
		setIsOpen(false);
	};

	const initialDrawerClassName =
		' fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ';
	const openDrawerClassName = 'transition-opacity opacity-100 duration-500 translate-x-0 ';
	const closeDrawerClassName = 'transition-all delay-500 opacity-0 translate-x-full  ';
	return (
		<>
			<div
				className={`${initialDrawerClassName} ${isOpen ? openDrawerClassName : closeDrawerClassName}`}>
				<div
					className={
						' w-screen  max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
						(isOpen ? ' translate-x-0 ' : ' translate-x-full ')
					}>
					<div className='flex flex-col h-full max-w-lg no-scrollbar overflow-y-scroll p-5 pb-10 space-y-6 w-screen'>
						<div className='flex justify-between'>
							<div className='flex'>
								<ConnyctLogo height={'2em'} width={'2em'} />
								<span className='font-bold ml-1 text-primary text-xl'> connyct</span>
							</div>
							<button
								type='button'
								onClick={onCloseHandler}
								className='bg-transparent inline-flex items-center p-1.5 right-2.5 rounded-lg text-gray-400 text-sm top-2.5 dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-200 hover:text-gray-900'>
								<svg
									aria-hidden='true'
									className='h-5 w-5'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										fillRule='evenodd'
										d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
										clipRule='evenodd'></path>
								</svg>
							</button>
						</div>
						<div className='h-full'>
							<ProductPostForm />
						</div>
					</div>
				</div>
				<div className='cursor-pointer h-full w-screen' onClick={onCloseHandler}></div>
			</div>
		</>
	);
};
