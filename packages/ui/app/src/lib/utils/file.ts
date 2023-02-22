export const MIN_FILE_SIZE = 1;
export const MAX_FILE_SIZE = 1024;

const FILE_NOT_SELECTEED_ERROR = 'No file has selected to upload';
const FILE_IS_TOO_SMALL = 'File size is less than minimum limit';
const FILE_IS_TOO_BIG = 'File size is greater than maximum limit';

export function validateFile(file?: File): { isValid: boolean; error?: string } {
  if (file) {
    const fileSizeKiloBytes = file.size / 1024;

    if (file.size / 1024 < MIN_FILE_SIZE) {
      return {
        isValid: false,
        error: FILE_IS_TOO_SMALL,
      };
    }

    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      return {
        isValid: false,
        error: FILE_IS_TOO_BIG,
      };
    }

    return {
      isValid: true,
    };
  }

  return {
    isValid: false,
    error: FILE_NOT_SELECTEED_ERROR,
  };
}
