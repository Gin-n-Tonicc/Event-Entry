import { baseApiUrl } from './base';

const base = `${baseApiUrl}/messages`;

export const messagesPaths = Object.seal({
  get: (userId: number) => `${base}/${userId}`,
  send: `${base}/send`,
});
