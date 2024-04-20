import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from 'use-http';
import {
  eventsPaths,
  filesPaths,
  userEventStatusesPaths,
} from '../../config/api';
import { useAuthContext } from '../../contexts/AuthContext';
import { IUser } from '../../types';
import { IEvent } from '../../types/interfaces/events/IEvent';

const CHARACTER_DESCRIPTION_THRESHOLD = 60;

function EventsDetails() {
  const { id } = useParams();
  const [reduced1, setReduced] = useState<string[]>([]);
  const { user } = useAuthContext();
  const [participatingUsers, setParticipatingUsers] = useState<IUser[]>([]);

  const eventId = Number(id || -1);

  const { data: event, loading: loadingEvent } = useFetch<IEvent>(
    eventsPaths.getById(eventId),
    []
  );

  const { data: participatingUsersFetch, loading: loadingStatuses } = useFetch<
    IUser[]
  >(userEventStatusesPaths.byEvent(eventId), []);

  const { post: postStatus, response } = useFetch<object[]>(
    userEventStatusesPaths.create
  );

  useEffect(() => {
    if (!participatingUsersFetch) {
      return;
    }

    setParticipatingUsers(participatingUsersFetch);
  }, [participatingUsersFetch]);

  useEffect(() => {
    if (!event) {
      return;
    }

    const separator = event.description.includes(' ') ? ' ' : '';
    const descWords = event.description.split(separator);

    const reduced = descWords.reduce<{
      count: number;
      previousIndex: number;
      newArr: string[];
    }>(
      (acc, x, i, arr) => {
        acc.count += x.length;

        if (acc.count > CHARACTER_DESCRIPTION_THRESHOLD) {
          const wordsMatchThreshold = arr
            .slice(acc.previousIndex, i)
            .join(separator);
          acc.previousIndex = i;
          acc.newArr.push(wordsMatchThreshold);
          acc.count = 0;
        }

        return acc;
      },
      { count: 0, previousIndex: 0, newArr: [] }
    );

    reduced.newArr.push(
      descWords
        .slice(reduced.previousIndex, descWords.length - 1)
        .join(separator)
    );

    setReduced(reduced.newArr);
  }, [event]);

  const handleParticipation = async () => {
    const body = {
      id: 0,
      userId: user.id,
      eventId: eventId,
    };

    await postStatus(body);
    if (response.ok) {
      setParticipatingUsers((prev) => [...prev, user as IUser]);
    }
  };

  console.log(participatingUsers);

  const participating = useMemo(
    () => participatingUsers.some((x) => x.id === user.id),
    [participatingUsers, user]
  );

  return (
    <>
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="row gy-5 gx-4">
            <div className="d-flex flex-column align-items-center mb-5">
              <img
                className="flex-shrink-0 img-fluid border rounded mb-5"
                src={filesPaths.getByUrl(event?.picture.url || '')}
                alt=""
                style={{
                  maxWidth: '50vw',
                  maxHeight: '30vw',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
              <div
                className="mb-5 d-flex flex-column justify-content-center align-items-center ps-4 gap-5"
                style={{
                  maxWidth: '50vw',
                }}>
                <div className="text-start d-flex flex-column justify-content-center align-items-center">
                  <h3 className="mb-3">{event?.name}</h3>
                  <div>
                    <span className="text-truncate me-3">
                      <i className="fa fa-map-marker-alt text-primary me-2" />
                      {event?.address}
                    </span>
                  </div>
                  <div>
                    <span className="text-truncate me-3">
                      <i className="far fa-clock text-primary me-2" />
                      {event?.startTime.toLocaleString()} -{' '}
                      {event?.endTime.toLocaleString()}
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span className="text-truncate me-0">
                      <i className="far fa-user text-primary me-2" />
                      People Interested: {event?.liked_users.length}
                    </span>
                    <span className="text-truncate me-0">
                      <i className="fas fa-user text-primary me-2" />
                      People Going: {participatingUsers.length}
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center gap-3 mb-3">
                  <h4>Event description</h4>
                  <p style={{ textAlign: 'center' }}>{reduced1.join('\n')}</p>
                  <div style={{ width: '60%' }}>
                    <button
                      className="btn btn-primary w-100"
                      disabled={
                        loadingEvent || loadingStatuses || participating
                      }
                      onClick={handleParticipation}>
                      {!participating
                        ? 'Mark as participating'
                        : 'Successfully marked as participating'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center gap-5">
              <div
                style={{ width: '50%', height: '100%' }}
                className="bg-light rounded p-5 wow slideInUp"
                data-wow-delay="0.1s">
                <h4 className="mb-4">Event Summary</h4>
                <p>
                  <i className="fa fa-angle-right text-primary me-2" />
                  Start Date: {event?.startTime.toLocaleString()}
                </p>
                <p>
                  <i className="fa fa-angle-right text-primary me-2" />
                  End Date: {event?.endTime.toLocaleString()}
                </p>
                <p>
                  <i className="fa fa-angle-right text-primary me-2" />
                  Address: {event?.address}
                </p>
                <p>
                  <i className="fa fa-angle-right text-primary me-2" />
                  Skills: {event?.skills.map((x) => x.name).join(', ')}
                </p>
              </div>
              <div
                style={{ width: '50%', height: '100%' }}
                className="bg-light rounded p-5 wow slideInUp"
                data-wow-delay="0.1s">
                <h4 className="mb-4">Organisation Detail</h4>
                <p className="m-0">
                  What can we help with? {user.whatCanHelpWith}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventsDetails;
