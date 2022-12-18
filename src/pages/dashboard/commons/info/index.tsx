type InfoProps = {
	title: string;
	description: string;
};

const Info = ({ title, description }: InfoProps): JSX.Element => {
	return (
		<>
			<div className='bg-slate-50 flex heading p-4'>
				<div className='flex-1'>
					<p className='font-extrabold text-lg'>{title}</p>
					<p className='font-light py-2 text-gray-600 text-md lg:leading-6'>{description}</p>
				</div>
				<div className='w-full lg:w-4/12'>
					<div className='flex'>
						<button className='border-2 border-black border-solid duration-300 ease-in-out font-semibold mr-6 px-4 py-3 rounded-lg transition hover:bg-black hover:text-white'>
							Export CSV
						</button>
						<button className='border-2 border-primary border-solid duration-300 ease-in-out font-semibold mr-6 px-4 py-3 rounded-lg text-primary transition hover:bg-primary hover:text-white'>
							Setup Product
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Info;
