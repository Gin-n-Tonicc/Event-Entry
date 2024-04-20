import { baseApiUrl } from './base';

const base = `${baseApiUrl}/files`;

export const filesPaths = Object.seal({
  getByFilename(fileName: string) {
    return `${base}/${fileName}`;
  },
  getByUrl(url: string) {
    const imgArr = url.split('/');
    const fileName = imgArr[imgArr.length - 1];
    return this.getByFilename(fileName);
  },
  upload() {
    return `${base}/upload`;
  },
});
