import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from 'use-http';
import {
  eventsPaths,
  filesPaths,
  userEventStatusesPaths,
} from '../../config/api';
import { useAuthContext } from '../../contexts/AuthContext';
import { PageEnum } from '../../types/enums/PageEnum';
import { IUser } from '../../types/interfaces/auth/IUser';
import { IEvent } from '../../types/interfaces/events/IEvent';

function EventsDetails() {
  const { id } = useParams();
  const { user, isAuthenticated, hasFinishedOAuth2 } = useAuthContext();
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
                      People Participating: {participatingUsers.length}
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center gap-3 mb-3">
                  <h4>Event description</h4>
                  <p style={{ textAlign: 'center' }}>{event?.description}</p>
                  <div style={{ width: '60%' }}>
                    <button
                      className="btn btn-primary w-100"
                      disabled={
                        loadingEvent ||
                        loadingStatuses ||
                        participating ||
                        !isAuthenticated ||
                        !hasFinishedOAuth2
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
            <div
              className="col-sm-12 ps-0 wow slideInUp"
              style={{
                maxWidth: '150%',
                maxHeight: '60vh',
                overflowY: 'scroll',
              }}>
              <div>
                <div className="card-body">
                  <h5 className="d-flex align-items-center mb-3">
                    People Participating: {participatingUsers.length}
                  </h5>
                  <div>
                    <div className="card d-flex row">
                      {participatingUsers.map((x) => (
                        <div
                          className="p-4 d-flex align-items-center gap-3"
                          key={x.id}>
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar2.png"
                            alt=""
                            className="rounded-circle"
                            width="40"
                            height="40"
                          />
                          <div>
                            <Link
                              to={PageEnum.Profile.replace(
                                ':userId',
                                x.id.toString()
                              )}
                              className="fw-semibold mb-0">
                              <h5>{x.firstname}</h5>
                            </Link>
                            <span className="fs-7 d-flex align-items-center">
                              <i className="ti ti-map-pin text-dark fs-3 me-1"></i>
                              {x.whatCanHelpWith}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
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
                <p className="m-0 text-blue te text-decoration-underline">
                  Connect with us through our profile page!
                </p>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventsDetails;
