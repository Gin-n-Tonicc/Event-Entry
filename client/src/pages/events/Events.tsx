import { useState } from 'react';
import { CachePolicies, useFetch } from 'use-http';
import Spinner from '../../components/spinner/Spinner';
import { eventsPaths } from '../../config/api';
import { EventsFilterEnum } from '../../types';
import { IEvent } from '../../types/interfaces/events/IEvent';
import EventsBreadcrumb from './events-breadcrumb/EventsBreadcrumb';
import EventsItem from './events-item/EventsItem';
import './Events.scss';

const EVENT_COUNT_DEFAULT = 5;
const EVENT_COUNT_INCREMENT = 5;

function Events() {
  const [haveGoneToFilter, setHaveGoneToFilter] = useState(false);
  const [eventsFilter, setEventsFilter] = useState(EventsFilterEnum.ALL);
  const [eventsNumber, setEventsNumber] = useState(EVENT_COUNT_DEFAULT);

  const { data: events } = useFetch<IEvent[]>(
    eventsPaths.filter(haveGoneToFilter, eventsNumber, eventsFilter),
    { cachePolicy: CachePolicies.CACHE_AND_NETWORK },
    [haveGoneToFilter, eventsFilter, eventsNumber]
  );

  if (!events) {
    return <Spinner />;
  }

  return (
    <>
      <EventsBreadcrumb />
      <div className="container-xxl py-5">
        <div className="container">
          <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
            Event Listing
          </h1>
          <div
            className="tab-class text-center wow fadeInUp"
            data-wow-delay="0.3s">
            <div className="form-check d-flex justify-content-center align-items-center gap-4 mb-4 ">
              <label
                className="form-check-label me-2"
                htmlFor="flexCheckDefault">
                <h6 className="m-0 pt-2">Have gone to? </h6>
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                checked={haveGoneToFilter}
                onChange={() => setHaveGoneToFilter((prev) => !prev)}
              />
            </div>
            <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
              <li className="nav-item">
                <a
                  className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active"
                  data-bs-toggle="pill"
                  onClick={() => setEventsFilter(EventsFilterEnum.ALL)}>
                  <h6 className="mt-n1 mb-0">{EventsFilterEnum.ALL}</h6>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="d-flex align-items-center text-start mx-3 pb-3"
                  data-bs-toggle="pill"
                  onClick={() => setEventsFilter(EventsFilterEnum.WILL_HAPPEN)}>
                  <h6 className="mt-n1 mb-0">{EventsFilterEnum.WILL_HAPPEN}</h6>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="d-flex align-items-center text-start mx-3 me-0 pb-3"
                  data-bs-toggle="pill"
                  onClick={() => setEventsFilter(EventsFilterEnum.FAVOURITED)}>
                  <h6 className="mt-n1 mb-0">{EventsFilterEnum.FAVOURITED}</h6>
                </a>
              </li>
            </ul>

            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                {events?.map((x) => (
                  <EventsItem key={x.id} {...x} />
                ))}
                {(events || []).length <= 0 && (
                  <h1 className="mb-5">No current events</h1>
                )}

                {eventsNumber > (events || [])?.length ? null : (
                  <a
                    className="btn btn-primary py-3 px-5"
                    onClick={() =>
                      setEventsNumber((prev) => prev + EVENT_COUNT_INCREMENT)
                    }>
                    Browse More Jobs
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;
