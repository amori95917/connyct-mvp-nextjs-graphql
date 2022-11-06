export const Loader = () => {
	return (
		<>
			<h2>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					xmlnsXlink='http://www.w3.org/1999/xlink'
					style={{
						margin: 'auto',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '100vh',
					}}
					width='80px'
					height='80px'
					viewBox='0 0 100 100'
					preserveAspectRatio='xMidYMid'>
					<g transform='translate(50 50)'>
						<g>
							<animateTransform
								attributeName='transform'
								type='rotate'
								calcMode='discrete'
								values='0;90;180;270;360'
								keyTimes='0;0.25;0.5;0.75;1'
								dur='2.5s'
								repeatCount='indefinite'></animateTransform>
							<path d='M-40 0A40 40 0 1 0 40 0' fill='#1d3f72'>
								<animate
									attributeName='fill'
									calcMode='discrete'
									values='#1d3f72;#5699d2;#d8ebf9;#71c2cc;#1d3f72'
									keyTimes='0;0.24;0.49;0.74;0.99'
									dur='2.5s'
									repeatCount='indefinite'></animate>
							</path>
							<path d='M-40 0A40 40 0 0 1 40 0' fill='#5699d2'>
								<animate
									attributeName='fill'
									calcMode='discrete'
									values='#5699d2;#d8ebf9;#71c2cc;#1d3f72;#5699d2'
									keyTimes='0;0.25;0.5;0.75;1'
									dur='2.5s'
									repeatCount='indefinite'></animate>
							</path>
							<path d='M-39 0L39 0' stroke='#142c50' strokeWidth='2'>
								<animate
									attributeName='stroke'
									values='#1d3f72;#142c50;#2c6ca4;#5699d2;#2c6ca4;#5fade6;#d8ebf9;#5fade6;#3b98a3;#71c2cc;#3b98a3;#142c50;#1d3f72'
									keyTimes='0;0.124;0.125;0.25;0.374;0.375;0.5;0.624;0.625;0.75;0.874;0.875;1'
									dur='2.5s'
									repeatCount='indefinite'></animate>
							</path>
							<g>
								<path d='M-40 0A40 40 0 0 1 40 0Z' fill='#142c50'>
									<animate
										attributeName='fill'
										values='#1d3f72;#142c50;#2c6ca4;#5699d2;#2c6ca4;#5fade6;#d8ebf9;#5fade6;#3b98a3;#71c2cc;#3b98a3;#142c50;#1d3f72'
										keyTimes='0;0.124;0.125;0.25;0.374;0.375;0.5;0.624;0.625;0.75;0.874;0.875;1'
										dur='2.5s'
										repeatCount='indefinite'></animate>
									<animateTransform
										attributeName='transform'
										type='scale'
										values='1 1;1 0;1 -1;1 1'
										keyTimes='0;0.5;0.999;1'
										dur='0.625s'
										repeatCount='indefinite'></animateTransform>
								</path>
							</g>
						</g>
					</g>
				</svg>
			</h2>
		</>
	);
};
