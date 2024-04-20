import { baseApiUrl } from './base';

export const adminPaths = Object.seal({
  get: (pathName: string) => `${baseApiUrl}${pathName}/all`,
  post: (pathName: string) => `${baseApiUrl}${pathName}/create`,
  updateDelete: (pathName: string) => `${baseApiUrl}${pathName}`,
});
