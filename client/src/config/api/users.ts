import { baseApiUrl } from './base';

const base = `${baseApiUrl}/users`;

export const usersPaths = Object.seal({
  getById: (userId: number) => `${base}/byId/${userId}`,
});
