import { baseApiUrl } from './base';

const base = `${baseApiUrl}/events`;

export const eventsPaths = Object.seal({
  create: `${base}/create`,
});
