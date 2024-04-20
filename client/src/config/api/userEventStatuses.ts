import { baseApiUrl } from './base';

const base = `${baseApiUrl}/userEventStatuses`;

export const userEventStatusesPaths = Object.seal({
  create: `${base}/create`,
  byEvent: (eventId: number) => {
    const url = new URL(`${base}/by-event`);
    url.searchParams.append('eventId', eventId.toString());

    return url.toString();
  },
});
