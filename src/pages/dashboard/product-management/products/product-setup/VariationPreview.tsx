const getProducts = arrays => {
	if (arrays.length === 0) {
		return [[]];
	}

	let results = [];

	getProducts(arrays.slice(1)).forEach(product => {
		arrays[0].forEach(value => {
			results.push([value].concat(product));
		});
	});

	return results;
};
const getAllCombinations = variations => {
	const variationName = variations.map(variation => variation.option);
	const variationValues = variations.map(variation =>
		variation.values?.map(variationVal => variationVal['value'])
	);
	const filteredVariationValues = variationValues.filter(variationVal => variationVal !== undefined);
	return getProducts(filteredVariationValues).map(product => {
		const obj = {};
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

const VariationPreview = ({ variations }) => {
	const variationOptions = variations.map(variation => variation.option);
	const allVariationCombinations = getAllCombinations(variations);
	return (
		<>
			<div className='overflow-hidden mt-4 ring-1 ring-black ring-opacity-5 shadow md:rounded-lg'>
				<table className='divide-gray-300 divide-y min-w-full'>
					<thead className='bg-gray-50'>
						<tr>
							{variations.map(variation => (
								<th
									key={variation.option}
									scope='col'
									className='font-semibold pl-4 pr-3 py-3.5 text-gray-900 text-left text-sm sm:pl-6'>
									{variation.option}
								</th>
							))}
							<th
								scope='col'
								className='font-semibold pl-4 pr-3 py-3.5 text-gray-900 text-left text-sm sm:pl-6'>
								Image
							</th>
							<th
								scope='col'
								className='font-semibold pl-4 pr-3 py-3.5 text-gray-900 text-left text-sm sm:pl-6'>
								Price
							</th>
							<th
								scope='col'
								className='font-semibold pl-4 pr-3 py-3.5 text-gray-900 text-left text-sm sm:pl-6'>
								Quantity
							</th>
							<th
								scope='col'
								className='font-semibold pl-4 pr-3 py-3.5 text-gray-900 text-left text-sm sm:pl-6'>
								SKU
							</th>
							<th
								scope='col'
								className='font-semibold pl-4 pr-3 py-3.5 text-gray-900 text-left text-sm sm:pl-6'>
								Barcode
							</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-gray-200 divide-y'>
						{allVariationCombinations.map(variation => {
							return (
								<tr key={variation.id}>
									{variationOptions.map(option => (
										<td key={option} className='pl-4 pr-3 py-4 text-sm whitespace-nowrap sm:pl-6'>
											{variation[option]}
										</td>
									))}
									<td className='px-3 py-4 text-gray-500 text-sm whitespace-nowrap'>Image</td>
									<td className='px-3 py-4 text-gray-500 text-sm whitespace-nowrap'>{variation.price}</td>
									<td className='px-3 py-4 text-gray-500 text-sm whitespace-nowrap'>{variation.quantity}</td>
									<td className='px-3 py-4 text-gray-500 text-sm whitespace-nowrap'>{variation.sku}</td>
									<td className='px-3 py-4 text-gray-500 text-sm whitespace-nowrap'>{variation.barcode}</td>
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
