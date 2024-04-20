import { baseApiUrl } from './base';

const base = `${baseApiUrl}/userFriend`;

export const friendsPaths = Object.seal({
  getById: (userId: number) => `${base}/list/${userId}`,
  add: (friendId: number) => `${base}/add/${friendId}`,
  requestsById: (userId: number) => `${base}/requests/${userId}`,
  confirmRequest: (friendId: number) => `${base}/confirm/${friendId}`,
  removeRequest: (friendId: number) => `${base}/remove/${friendId}`,
});
