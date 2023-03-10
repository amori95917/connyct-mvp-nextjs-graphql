// import styles from './LoadingDots.module.css';

const LoadingDots = () => (
	<div className='wave-dots'>
		<div className='wave-dot' />
		<div className='wave-dot' />
		<div className='wave-dot' />
		<style jsx>{`
			@keyframes wave {
				0% {
					transform: translateX(0);
				}
				50% {
					transform: translateX(4px);
				}
				100% {
					transform: translateX(0);
				}
			}
			.wave-dots {
				display: inline-block;
				position: relative;
			}
			.wave-dot {
				display: inline-block;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				background-color: currentColor;
				animation: wave 1s ease-in-out infinite;
			}
			.wave-dot:not(:first-child) {
				margin-left: 8px;
			}
		`}</style>
	</div>
);

export default LoadingDots;
