export const getPostedDuration = (createdAt: Date) => {
	const duration = Math.abs(new Date().getTime() - new Date(createdAt).getTime());
	const seconds = Math.floor(duration / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const week = Math.floor(days / 7);
	const month = Math.floor(week / 4.5);
	const year = Math.floor(month / 12);
	if (!!year) {
		return year + 'y';
	} else if (!!month) {
		return month + 'm';
	} else if (!!week) {
		return week + 'w';
	} else if (!!days) {
		return days + 'd';
	} else if (!!hours) {
		return hours + 'h';
	} else if (!!minutes) {
		return minutes + 'min';
	} else if (!!seconds) {
		return seconds + 's';
	}
	return '';
};
