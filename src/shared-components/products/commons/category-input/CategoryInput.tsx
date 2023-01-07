import { ROOT_CATEGORIES, SUB_CATEGORIES } from '@/graphql/product';
import { FormSelect } from '@/shared-components/forms';
import { NextIcon } from '@/ui-elements/atoms/icons';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { components } from 'react-select';

type CategoryInputProps = {
	name: string;
	label: string;
	placeholder: string;
	options?: Array<any>;
	helperText: string;
	errors: any;
};

const CategoryInput = (props: CategoryInputProps) => {
	const { name, label, placeholder, options, helperText, errors } = props;
	const { reset, setValue, register, control } = useForm();
	const [closeMenuOnSelect, setCloseMenuOnSelect] = useState(false);
	const { data, loading } = useQuery(ROOT_CATEGORIES);
	const [loadSubCategories, { data: subCategoriesData }] = useLazyQuery(SUB_CATEGORIES);
	const [selectedParentCategory, setSelectedParentCategory] = useState<string | undefined>(
		undefined
	);
	const [currentOptions, setCurrentOptions] = useState([]);
	const [categoryStack, setCategoryStack] = useState([]);

	useEffect(() => {
		setCurrentOptions(data?.rootCategory ?? []);
	}, [data]);

	const handleCloseMenu = () => {
		setCloseMenuOnSelect(true);
	};
	const handleSubCategoryofCategory = async (parentCategoryId: string) => {
		const parentCategory = currentOptions.find(category => category.id === parentCategoryId);
		if (parentCategory) {
			console.log('parentCategory', parentCategory);
			const formattedParentCategory = {
				...parentCategory,
				label: parentCategory.name,
				value: parentCategory.id,
			};
			setCategoryStack(stack => [...stack, formattedParentCategory]);

			await loadSubCategories({
				variables: {
					parentId: parentCategoryId,
				},
				onCompleted(data) {
					setCurrentOptions(data?.subCategoryList ?? []);
					setValue(name, formattedParentCategory);
					setCloseMenuOnSelect(false);
				},
			});
		}
	};
	const handleBackButton = () => {
		setCategoryStack(stack => {
			if (stack.length > 0) {
				// Pop the top element off the stack
				const previousCategory = stack.slice(-2, -1)[0];
				console.log('previousCategory', previousCategory);
				console.log('stack', stack);
				setValue(name, previousCategory);
				setCurrentOptions(stack);
			}
			// Pop the top element off the stack
			return stack.slice(0, -1);
		});
	};

	const handleCategorySelect = data => {
		reset(data);
		const newData = { ...data, label: data.name, value: data.id };
		setValue(name, newData);
		handleCloseMenu();
	};

	return (
		<FormSelect
			name={name}
			label={label}
			placeholder={placeholder}
			options={currentOptions}
			helperText={helperText}
			errors={errors}
			register={register}
			wrapperClassName='mb-8'
			control={control}
			categoryStack={categoryStack}
			handleCategorySelect={handleCategorySelect}
			handleSubCategoryofCategory={handleSubCategoryofCategory}
			handleBackButton={handleBackButton}
			closeMenuOnSelect={closeMenuOnSelect}
			menuIsOpen={true}
			components={{ Option: CategoryOption, MenuList }}
		/>
	);
};

export default CategoryInput;

const CategoryOption = props => {
	return (
		<components.Option {...props}>
			<div className='flex justify-between'>
				<p onClick={() => props.selectProps.handleCategorySelect(props.data)} className='w-10/12'>
					{props.data.name}
				</p>
				{props.data.isLeaf === false && (
					<NextIcon onClick={() => props.selectProps.handleSubCategoryofCategory(props.data.id)} />
				)}
			</div>
		</components.Option>
	);
};

const MenuList = props => {
	return (
		<components.MenuList {...props}>
			{props.selectProps.categoryStack?.length > 0 && (
				<div className='flex items-center p-2 shadow-md'>
					<div className='cursor-pointer' onClick={props.selectProps.handleBackButton}>
						Back
					</div>
					{props.selectProps.value && (
						<p className='text-center text-md w-full'>{props.selectProps.value.name}</p>
					)}
				</div>
			)}
			{props.children}
		</components.MenuList>
	);
};
