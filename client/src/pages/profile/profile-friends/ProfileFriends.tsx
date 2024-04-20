import { IFullUser } from '../../../types';
import ProfileFriend from './profile-friend/ProfileFriend';

interface ProfileFriendsProps {
  friends: IFullUser[];
  refresh: () => Promise<void>;
}

function ProfileFriends(props: ProfileFriendsProps) {
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
          <h5 className="d-flex align-items-center mb-3">Friends</h5>
          <div>
            <div className="card d-flex row">
              {props.friends.map((x) => (
                <ProfileFriend friend={x} key={x.id} refresh={props.refresh} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileFriends;
