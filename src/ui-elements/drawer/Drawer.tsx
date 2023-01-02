import { useEffect, useRef, useState } from 'react';

export type DrawerProps = {
	size: 'small' | 'medium' | 'large' | 'full';
	direction: 'top' | 'bottom' | 'left' | 'right';
	wrapperClassName?: string;
	contentClassName?: string;
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode | ((open: boolean) => React.ReactNode);
};

const Drawer = ({
	size,
	direction,
	isOpen,
	onClose,
	children,
	wrapperClassName = '',
	contentClassName = '',
}: DrawerProps) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(isOpen);
	const drawerRef = useRef<HTMLDivElement>(null);

	// Add or remove a "open" class to the drawer element based on the isDrawerOpen state
	useEffect(() => {
		if (drawerRef.current) {
			if (isDrawerOpen) {
				drawerRef.current.classList.add('open');
			} else {
				drawerRef.current.classList.remove('open');
			}
		}
	}, [isDrawerOpen]);

	// Close the drawer when the user clicks outside of it
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
				setIsDrawerOpen(false);
			}
		};
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	// const renderChildren = (...args: any[]) =>
	//   typeof children === 'function' ? children(...args) : children;

	return (
		<div
			ref={drawerRef}
			className={`${wrapperClassName} fixed z-50 inset-0 overflow-auto ${size} ${direction}-0 transition duration-300`}
			onClick={() => setIsDrawerOpen(false)}
			data-id='drawer'>
			<div
				className={`${contentClassName} ${size} ${direction}-0 bg-white rounded-lg shadow-xl py-4 px-6 transform transition-all duration-300 ease-in-out ${
					size === 'full' ? 'h-full w-full' : ''
				}`}>
				{typeof children === 'function' ? children(isOpen) : children}
			</div>
		</div>
	);
};

export default Drawer;
