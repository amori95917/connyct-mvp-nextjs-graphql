const getProducts = (arrays: string[][]): string[][] => {
	if (arrays.length === 0) {
		return [[]];
	}

	let results: string[][] = [];

	getProducts(arrays.slice(1)).forEach(product => {
		arrays[0].forEach(value => {
			results.push([value].concat(product));
		});
	});

	return results;
};
const getAllCombinations = (variations: VariationProps[]) => {
	const variationName = variations.map((variation: VariationProps) => variation.option);
	const variationValues: (string[] | undefined)[] = variations.map((variation: VariationProps) =>
		variation.values?.map(variationVal => variationVal['value'])
	);
	const filteredVariationValues: string[][] = variationValues.filter(
		variationVal => variationVal !== undefined
	) as string[][];
	return getProducts(filteredVariationValues).map(product => {
		const obj: VariationObject = {};
		variationName.forEach((name, i) => {
			obj['id'] = `${product.join('-')}-${i}`;
			obj[name] = product[i];
			obj['price'] = '$20';
			obj['quantity'] = '1';
			obj['sku'] = 'sku123';
			obj['barcode'] = 'abc123';
		});
		return obj;
	});
};

type VariationObject = {
	[key: string]: string;
};

type ValueProps = {
	id: number;
	label: string;
	value: string;
};

type VariationProps = {
	id: number;
	option: string;
	values?: ValueProps[];
};

type VariationPreviewProps = {
	variations: VariationProps[];
	setValue: any;
};

const VariationPreview = (props: VariationPreviewProps) => {
	const { variations, setValue } = props;
	const variationOptions = variations.map(variation => variation.option);
	const allVariationCombinations = getAllCombinations(variations);
	console.log('allVariationCombinations', allVariationCombinations, setValue);
	setValue('allVariations', allVariationCombinations);
	return (
		<>
			<div className='mt-4 overflow-hidden ring-1 ring-black ring-opacity-5 shadow md:rounded-lg'>
				<table className='divide-gray-300 divide-y min-w-full'>
					<thead className='bg-gray-50'>
						<tr>
							{variations.map(variation => (
								<th
									key={variation.option}
									scope='col'
									className='font-semibold pl-1 py-3.5 text-gray-900 text-left text-sm'>
									{variation.option}
								</th>
							))}
							<th scope='col' className='font-semibold py-3.5 text-gray-900 text-left text-sm'>
								Image
							</th>
							<th scope='col' className='font-semibold py-3.5 text-gray-900 text-left text-sm'>
								Price
							</th>
							<th scope='col' className='font-semibold py-3.5 text-gray-900 text-left text-sm'>
								Quantity
							</th>
							<th scope='col' className='font-semibold py-3.5 text-gray-900 text-left text-sm'>
								SKU
							</th>
							<th scope='col' className='font-semibold py-3.5 text-gray-900 text-left text-sm'>
								Barcode
							</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-gray-200 divide-y'>
						{allVariationCombinations.map(variation => {
							return (
								<tr key={variation.id}>
									{variationOptions.map(option => (
										<td key={option} className='pr-3 py-4 text-sm whitespace-nowrap sm:pl-2'>
											{variation[option]}
										</td>
									))}
									<td className='py-4 text-gray-500 text-sm whitespace-nowrap'>
										<div className='bg-slate-100 h-16 w-16'></div>
									</td>
									<td className='py-4 text-gray-500 text-sm whitespace-nowrap'>{variation.price}</td>
									<td className='py-4 text-gray-500 text-sm whitespace-nowrap'>{variation.quantity}</td>
									<td className='py-4 text-gray-500 text-sm whitespace-nowrap'>{variation.sku}</td>
									<td className='py-4 text-gray-500 text-sm whitespace-nowrap'>{variation.barcode}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default VariationPreview;
