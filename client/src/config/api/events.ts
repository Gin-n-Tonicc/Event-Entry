import { EventsFilterEnum } from '../../types';
import { baseApiUrl } from './base';

const base = `${baseApiUrl}/events`;

export const eventsPaths = Object.seal({
  create: `${base}/create`,
  like: (id: number) => `${base}/like/${id}`,
  filter: (
    hasGoneTo: boolean,
    numberEvents: number,
    filterType: EventsFilterEnum
  ) => {
    const url = new URL(`${base}/filter`);
    url.searchParams.append('hasGoneTo', '' + hasGoneTo);
    url.searchParams.append('numberEvents', numberEvents.toString());
    url.searchParams.append('filterType', filterType.toString());

    return url.toString();
  },
});
