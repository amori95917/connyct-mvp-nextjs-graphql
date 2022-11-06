import { MenuProps } from './types';
import { useDropdownContext } from './useDropdownContext';

export const Menu = (props: MenuProps) => {
	const { children, ...rest } = props;
	const { isToggle } = useDropdownContext();

	return <>{isToggle && children}</>;
};
