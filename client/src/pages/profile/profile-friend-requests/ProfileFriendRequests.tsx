import { useFetch } from 'use-http';
import { friendsPaths } from '../../../config/api/friends';
import { IFullUser, IUserFriend } from '../../../types';
import ProfileFriendRequest from './profile-friend-request/ProfileFriendRequest';

interface ProfileFriendRequestsProps {
  user: IFullUser;
  refresh: () => Promise<void>;
}

function ProfileFriendRequests({
  user,
  refresh: refreshParent,
}: ProfileFriendRequestsProps) {
  const { get, data: friendRequests } = useFetch<IUserFriend[]>(
    friendsPaths.requestsById(user.id),
    []
  );

  const refresh = async () => {
    await get();
    await refreshParent();
  };

  return (
    <div
      className="col-sm-12 ps-0"
      style={{
        maxWidth: '150%',
        maxHeight: '60vh',
        overflowY: 'scroll',
      }}>
      <div>
        <div className="card-body">
          <h5 className="d-flex align-items-center mb-3">Friend Requests</h5>
          <div>
            <div className="card d-flex row">
              {friendRequests?.map((x) => (
                <ProfileFriendRequest
                  requester={x.friend}
                  refresh={refresh}
                  key={x.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileFriendRequests;
