import { Link } from 'react-router-dom';
import { useFetch } from 'use-http';
import { friendsPaths } from '../../../../config/api/friends';
import { PageEnum } from '../../../../types/enums/PageEnum';
import { IFullUser } from '../../../../types/interfaces/auth/IFullUser';

interface ProfileFriendProps {
  friend: IFullUser;
  refresh: () => Promise<void>;
  isOwner: boolean;
}

function ProfileFriend({ friend, refresh, isOwner }: ProfileFriendProps) {
  const { del } = useFetch<void>(friendsPaths.removeRequest(friend.id));

  const onDelete = async () => {
    await del();
    await refresh();
  };

  return (
    <div className="p-4 d-flex align-items-center gap-3">
      <img
        src="https://bootdey.com/img/Content/avatar/avatar2.png"
        alt=""
        className="rounded-circle"
        width="40"
        height="40"
      />
      <div>
        <Link
          to={PageEnum.Profile.replace(':userId', friend.id.toString())}
          className="fw-semibold mb-0">
          <h5>
            {friend.firstname} {friend.lastname}
          </h5>
        </Link>
        <span className="fs-7 d-flex align-items-center">
          <i className="ti ti-map-pin text-dark fs-3 me-1"></i>
          Workplace: {friend.currentWorkPlace}
        </span>
      </div>
      {isOwner && (
        <button
          className="btn btn-outline-primary py-1 px-2 ms-auto"
          onClick={onDelete}>
          Remove
        </button>
      )}
    </div>
  );
}

export default ProfileFriend;
