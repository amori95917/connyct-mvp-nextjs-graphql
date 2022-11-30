import { forwardRef } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { Label } from '@/ui-elements/atoms/forms';

const ReactSelect = forwardRef(
	(
		{
			disabled,
			label,
			helperText,
			name,
			labelId,
			placeholder,
			options,
			initialValue,
			className,
			labelClassName,
			wrapperClassName,
			isCreateable = false,
			selectStyles,
			isMulti = true,
			setValue,
			...rest
		},
		ref
	) => {
		const customStyles = {
			control: (styles, state) => ({
				...styles,
				backgroundColor: 'rgb(229 231 235 / 1)',
				borderRadius: '0.25rem',
				border: 'transparent',
				outline: 'none',
				boxShadow: 0,
				padding: '0.5rem',
				'*': {
					boxShadow: 'none !important',
				},
				'&:focus': {
					background: 'transparent',
					outline: 'none',
				},
			}),
			singleValue: (styles, state) => {
				const opacity = state.isDisabled ? 0.5 : 1;
				const transition = 'opacity 300ms';

				return { ...styles, opacity, transition };
			},
			multiValue: styles => {
				return {
					...styles,
					backgroundColor: '#fff',
					color: '#444',
				};
			},
			option: (styles, state) => ({
				...styles,
				color: 'rgb(55 65 81 / 1)',
				background: state.isSelected ? '#E5E7EB' : 'white',
				':hover': {
					background: '#E5E7EB',
				},
			}),
		};

		const errorStyles = {
			control: styles => ({
				...styles,
				border: 'none',
				boxShadow: '0 0 0 0.04rem #EF4444',
				'*': {
					boxShadow: 'none !important',
				},
			}),
			option: (styles, state) => ({
				...styles,
				color: 'black',
				background: state.isSelected ? '#D1D5DB' : 'white',
				':hover': {
					background: '#E5E7EB',
				},
			}),
		};

		// const {
		// 	control,
		// 	formState: { errors },
		// } = useForm();

		const styles = selectStyles ?? customStyles;
		return (
			<div className={wrapperClassName || ''}>
				{/* TODO: Label as a separate component */}
				{label && <Label id={labelId} className={labelClassName} label={label} />}
				<div className='mt-1 relative'>
					{isCreateable ? (
						<CreatableSelect
							name={name}
							isMulti={isMulti}
							isDisabled={disabled}
							placeholder={placeholder}
							options={options}
							styles={styles}
							className={className}
							{...rest}
							// onChange={(options) =>
							// 	field.onChange(options?.map((option) => option.value))
							// }
							// value={options.filter((option) => field.value?.includes(option.value))}
						/>
					) : (
						<Select
							name={name}
							isDisabled={disabled}
							placeholder={placeholder}
							defaultInputValue={initialValue}
							options={options}
							styles={styles}
							className={className}
							onChange={value => setValue(name, value)}
							{...rest}
						/>
					)}
				</div>
				<div className='mt-1'>
					{helperText && typeof helperText === 'string' ? (
						<p className='italic text-gray-600 text-xs'>{helperText}</p>
					) : (
						helperText
					)}
				</div>
			</div>
		);
	}
);

export default ReactSelect;

ReactSelect.displayName = 'ReactSelect';
