const ConsumerLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<section className='container flex flex-col mx-auto'>
				<section className='content'>{children}</section>
			</section>
		</>
	);
};

export { ConsumerLayout };
