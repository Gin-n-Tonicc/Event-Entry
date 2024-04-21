import { Link } from 'react-router-dom';
import { useFetch } from 'use-http';
import { friendsPaths } from '../../../../config/api/friends';
import { PageEnum } from '../../../../types/enums/PageEnum';
import { IFullUser } from '../../../../types/interfaces/auth/IFullUser';

interface ProfileFriendRequestProps {
  requester: IFullUser;
  refresh: () => Promise<void>;
}

function ProfileFriendRequest({
  requester,
  refresh,
}: ProfileFriendRequestProps) {
  const { put } = useFetch<void>(friendsPaths.confirmRequest(requester.id));
  const { del } = useFetch<void>(friendsPaths.removeRequest(requester.id));

  const handleAccept = async () => {
    await put();
    await refresh();
  };

  const handleRemove = async () => {
    await del();
    await refresh();
  };

  return (
    <div className="p-4 d-flex align-items-center gap-3">
      <img
        src="https://bootdey.com/img/Content/avatar/avatar1.png"
        alt=""
        className="rounded-circle"
        width="40"
        height="40"
      />
      <div>
        <Link
          to={PageEnum.Profile.replace(':userId', requester.id.toString())}
          className="fw-semibold mb-0">
          <h5>
            {requester.firstname} {requester.lastname}
          </h5>
        </Link>
        <span className="fs-7 d-flex align-items-center">
          <i className="ti ti-map-pin text-dark fs-3 me-1"></i>
          Workplace: {requester.currentWorkPlace}
        </span>
      </div>
      <div className="ms-auto">
        <button
          className="btn btn-outline-primary py-1 px-2 ms-auto"
          onClick={handleAccept}>
          Accept
        </button>
        <span> </span>
        <button
          className="btn btn-outline-primary py-1 px-2 ms-auto"
          onClick={handleRemove}>
          Decline
        </button>
      </div>
    </div>
  );
}

export default ProfileFriendRequest;
