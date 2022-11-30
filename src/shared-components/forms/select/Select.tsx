import { Controller, useFormState } from 'react-hook-form';
import { FormSelect } from 'src/ui-elements/molecules/forms';

type Option = {
	label: string;
	value: string;
};

type FormSelectProps = {
	disabled?: boolean;
	label?: string;
	helperText?: string;
	name: string;
	placeholder?: string;
	options: Option[];
	defaultValue?: Option;
	id?: string;
	className?: string;
	labelClassName?: string;
	wrapperClassName?: string;
	isCreateable?: boolean;
	isMulti?: boolean;
	control: any;
};

export default function FormSelectField(props: FormSelectProps) {
	const {
		disabled = false,
		label,
		helperText = '',
		name,
		placeholder,
		options,
		defaultValue,
		id,
		className,
		labelClassName = '',
		wrapperClassName = '',
		isCreateable = false,
		isMulti = true,
		control,
	} = props;
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

	const { errors } = useFormState({
		control,
	});

	const getDefaultValues = values => {
		console.log('values', values);
		if (values && values.length) {
			return values[0];
		} else return values;
	};

	return (
		<>
			<Controller
				name={name}
				defaultValue={getDefaultValues(defaultValue)}
				control={control}
				render={({ field }) => {
					const styles = errors[name] ? errorStyles : customStyles;
					return (
						<FormSelect
							{...field}
							isMulti={isMulti}
							isCreateable={isCreateable}
							options={options}
							labelId={id}
							helperText={helperText}
							label={label}
							className={className}
							wrapperClassName={wrapperClassName}
							labelClassName={labelClassName}
							selectStyles={styles}
							disabled={disabled}
							placeholder={placeholder}
						/>
					);
				}}
			/>
		</>
	);
}
