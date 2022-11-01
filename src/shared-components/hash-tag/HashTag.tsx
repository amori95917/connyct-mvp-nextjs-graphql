const HashTag = ({ text = 'nothing' }) => {
	return (
		<span className='bg-gray-200 font-semibold h-7 inline-block mb-2 mr-2 px-3 py-1 rounded-full text-gray-700 text-sm'>
			#{text}
		</span>
	);
};

export default HashTag;
