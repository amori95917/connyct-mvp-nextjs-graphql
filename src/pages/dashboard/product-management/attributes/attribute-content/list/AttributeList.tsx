import Attribute from './Attribute';

const ATTRIBUTES = [
	{
		id: 1,
		label: 'Size',
		value: 'size',
		options: [
			{ id: 1, label: 'Small', value: 'small' },
			{ id: 2, label: 'Medium', value: 'medium' },
			{ id: 3, label: 'Large', value: 'Large' },
		],
		type: 'dropdown',
		hasVariants: true,
	},
	{
		id: 2,
		label: 'Color',
		value: 'color',
		options: [
			{ id: 1, label: 'Light Blue', value: 'light-blue' },
			{ id: 2, label: 'Black', value: 'black' },
			{ id: 3, label: 'Sea Green', value: 'sea-green' },
		],
		type: 'color',
		hasVariants: true,
	},
	{
		id: 3,
		label: 'Material',
		value: 'material',
		options: [
			{ id: 1, label: 'Cotton', value: 'cotton' },
			{ id: 2, label: 'Polyester', value: 'polyester' },
			{ id: 3, label: 'Nilon', value: 'nilon' },
		],
		type: 'list',
		hasVariants: false,
	},
];

const AttributeList = () => {
	return (
		<>
			<div className='flex flex-col w-full'>
				{ATTRIBUTES.map(attribute => (
					<Attribute key={attribute.id} data={attribute} />
				))}
			</div>
		</>
	);
};

export default AttributeList;
