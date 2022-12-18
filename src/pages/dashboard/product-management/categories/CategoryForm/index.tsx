const CategoryForm = () => {
	return (
		<>
			<p className='font-light my-6 py-2 text-gray-600 text-md lg:leading-6'>
				Product categories for your store can be managed here. To change the order of categories on the
				front-end you can drag and drop to sort them.
			</p>
			<h1 className='font-extrabold text-lg'>Add new category</h1>
			<form className='mt-6'>
				<div className='mb-6'>
					<label
						className='block font-bold mb-2 text-gray-700 text-xs tracking-wide uppercase'
						htmlFor='name'
					>
						Name
					</label>
					<input
						className='appearance-none bg-gray-200 block border border-red-500 leading-tight mb-3 px-4 py-3 rounded text-gray-700 w-full focus:bg-white focus:outline-none'
						id='name'
						type='text'
						placeholder='Name of category'
					/>
					<p className='italic text-gray-600 text-xs'>The name is how it appears on site</p>
				</div>
				<div className='mb-6'>
					<label
						className='block font-bold mb-2 text-gray-700 text-xs tracking-wide uppercase'
						htmlFor='slug'
					>
						Slug
					</label>
					<input
						className='appearance-none bg-gray-200 block border border-red-500 leading-tight mb-3 px-4 py-3 rounded text-gray-700 w-full focus:bg-white focus:outline-none'
						id='slug'
						type='text'
						placeholder='Slug of category'
					/>
					<p className='italic text-gray-600 text-xs'>
						The slug is the URL-friendly version of the name.
					</p>
				</div>
				<div className='mb-6'>
					<label
						htmlFor='message'
						className='block font-bold mb-2 text-gray-700 text-xs tracking-wide uppercase'
					>
						Description
					</label>
					<textarea
						id='message'
						rows='4'
						className='appearance-none bg-gray-200 block border border-red-500 leading-tight mb-3 px-4 py-3 rounded text-gray-700 w-full focus:bg-white focus:outline-none'
						placeholder='write a description'
					></textarea>
				</div>
			</form>
		</>
	);
};

export default CategoryForm;
