import { baseApiUrl } from './base';

const base = `${baseApiUrl}/skills`;

export const skillsPaths = Object.seal({
  getAll: `${base}/all`,
});
