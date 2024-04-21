import { Link, useParams } from 'react-router-dom';
import { useFetch } from 'use-http';
import Spinner from '../../components/spinner/Spinner';
import { usersPaths } from '../../config/api';
import { friendsPaths } from '../../config/api/friends';
import { useAuthContext } from '../../contexts/AuthContext';
import { PageEnum } from '../../types/enums/PageEnum';
import { IFullUser } from '../../types/interfaces/auth/IFullUser';
import { IUserFriend } from '../../types/interfaces/profile/IUserFriend';
import './Profile.scss';
import ProfileFriendRequests from './profile-friend-requests/ProfileFriendRequests';
import ProfileFriends from './profile-friends/ProfileFriends';

function Profile() {
  const { userId: idParam } = useParams();
  const { user: userMe } = useAuthContext();

  const userId = Number(idParam || -1);

  const {
    get: getHasSentFriendRequest,
    data: hasSentFriendRequest,
    loading: loadingHasSentFriendRequest,
  } = useFetch<boolean>(friendsPaths.hasSentRequest(userId), [userId]);

  const { data: user } = useFetch<IFullUser>(usersPaths.getById(userId), [
    userId,
  ]);

  const { get: getFriends, data: friends } = useFetch<IUserFriend[]>(
    friendsPaths.getById(userId),
    [userId]
  );

  const { post: postFriendReq } = useFetch<void>(
    friendsPaths.add(user?.id || -1)
  );

  const { del } = useFetch<void>(friendsPaths.removeFriendship(userId));

  const refreshFriends = async () => {
    await getFriends();
  };

  const handleAddFriend = async () => {
    if (userMe.id === user?.id) {
      return;
    }

    await postFriendReq();
    await getHasSentFriendRequest();
  };

  const handleRemoveFriendRequest = async () => {
    await del();
    await getHasSentFriendRequest();
  };

  if (!user || !friends || loadingHasSentFriendRequest) {
    return <Spinner />;
  }

  const isOwner = userMe.id === user.id;
  const mappedFriends = friends.map((x) => {
    const isUser = x.user.id === user.id;

    if (isUser) {
      return x.friend;
    }

    return x.user;
  });

  const areFriends = !isOwner && mappedFriends.some((x) => x.id === userMe.id);

  return (
    <div className="mt-5 px-5">
      <div className="row justify-content-between ">
        <div className="card" style={{ maxWidth: '35%' }}>
          <div className="card-body">
            <div
              style={{ marginTop: '40%' }}
              className="d-flex flex-column align-items-center text-center">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                alt="Admin"
                className="rounded-circle p-1 bg-primary"
                width={110}
              />
              <div className="mt-3">
                <h4>
                  {user.firstname} {user.lastname}
                </h4>
                <p className="text-secondary mb-1">
                  Workplace: {user.currentWorkPlace}
                </p>
                <p className="text-muted font-size-sm">
                  Address: {user.address}
                </p>
                {!isOwner && (
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    {areFriends ? null : hasSentFriendRequest ? (
                      <button
                        className="btn btn-outline-primary"
                        onClick={handleRemoveFriendRequest}>
                        Decline Request
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-primary"
                        onClick={handleAddFriend}>
                        Add Friend
                      </button>
                    )}
                    <Link
                      to={PageEnum.Chat.replace(':userId', user.id.toString())}>
                      <button className="btn btn-outline-primary">
                        Message
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="card" style={{ maxWidth: '63%' }}>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">Account Type</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                <p>{user.role}</p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">Email</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                <p>{user.email}</p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">First Name</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                <p>{user.firstname}</p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">Last Name</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                <p>{user.lastname}</p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">Address</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                <p>{user.address}</p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">Education</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                <p>{user.education}</p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">Workplace</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                <p>{user.currentWorkPlace}</p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">Work Experience</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                <p>{user.workExperience}</p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">What I can help with</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                <p>{user.whatCanHelpWith}</p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">Skills</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                <p>{user.skills.map((x) => x.name).join(', ')}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-3" />
              <div className="col-sm-9 text-secondary"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-8">
        <div className="row">
          <ProfileFriends
            friends={mappedFriends}
            refresh={refreshFriends}
            isOwner={isOwner}
          />
          {isOwner && (
            <ProfileFriendRequests user={user} refresh={refreshFriends} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
