import { EventsFilterEnum } from '../../types/enums/EventsFilterEnum';
import { baseApiUrl } from './base';

const base = `${baseApiUrl}/events`;

export const eventsPaths = Object.seal({
  getById: (id: number) => `${base}/${id}`,
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
