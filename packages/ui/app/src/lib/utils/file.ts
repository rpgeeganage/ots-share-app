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

export function readFileContent(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(arrayBufferToBase64(reader.result as any));
    };
    reader.onerror = function (e) {
      reject(e);
    };

    reader.readAsArrayBuffer(file);
  });
}

export function getBlob(content: string, mimeType: string): Blob {
  return b64toBlob(content, mimeType);
}

function arrayBufferToBase64(buffer: Uint8Array) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i] as number);
  }
  return btoa(binary);
}

function b64toBlob(data: string, type: string, sliceSize = 512): Blob {
  const byteCharacters = atob(data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type });
  return blob;
}
