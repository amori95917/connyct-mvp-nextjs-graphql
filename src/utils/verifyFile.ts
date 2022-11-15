export const verifyFile = (
	files: File[],
	acceptedFiles: string[] | undefined,
	fileSize = 10000
) => {
	if (files && files.length > 0) {
		const { type: currentFileType, size: currentFileSize } = files[0];
		if (currentFileSize > fileSize) {
			return false;
		}
		if (acceptedFiles && !acceptedFiles.includes(currentFileType)) {
			return false;
		}
		return true;
	}
};
