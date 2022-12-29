import styles from './loading-dots.module.css';

const LoadingDots = () => (
	<div className={styles.waveDots}>
		<div className={styles.waveDot} />
		<div className={styles.waveDot} />
		<div className={styles.waveDot} />
	</div>
);

export default LoadingDots;
