import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from 'use-http';
import Spinner from '../../components/spinner/Spinner';
import { usersPaths } from '../../config/api';
import { friendsPaths } from '../../config/api/friends';
import { useAuthContext } from '../../contexts/AuthContext';
import { IFullUser, IUserFriend } from '../../types';
import './Profile.scss';
import ProfileFriendRequests from './profile-friend-requests/ProfileFriendRequests';
import ProfileFriends from './profile-friends/ProfileFriends';

function Profile() {
  const { userId: idParam } = useParams();
  const { user: userMe } = useAuthContext();
  const [editing, setEditing] = useState(false);

  const userId = Number(idParam || -1);

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

  const refreshFriends = async () => {
    await getFriends();
  };

  const handleToggleEdit = () => {
    setEditing((prev) => !prev);
  };

  const handleAddFriend = async () => {
    if (userMe.id === user?.id) {
      return;
    }

    await postFriendReq();
  };

  if (!user || !friends) {
    return <Spinner />;
  }

  const isOwner = userMe.id === user.id;
  const mappedFriends = friends.map((x) => (isOwner ? x.friend : x.user));

  return (
    <div className="mt-5 px-5">
      <div className="row justify-content-between ">
        <div className="card" style={{ maxWidth: '35%' }}>
          <div className="card-body">
            <div className="d-flex flex-column align-items-center text-center">
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
                <p className="text-secondary mb-1">{user.currentWorkPlace}</p>
                <p className="text-muted font-size-sm">{user.address}</p>
                {!isOwner && (
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleAddFriend}>
                      Add Friend
                    </button>
                    <button className="btn btn-outline-primary">Message</button>
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
                {editing ? (
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={user.firstname}
                  />
                ) : (
                  <p>{user.firstname}</p>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">Last Name</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {editing ? (
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={user.lastname}
                  />
                ) : (
                  <p>{user.lastname}</p>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">Address</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {editing ? (
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={user.address}
                  />
                ) : (
                  <p>{user.address}</p>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">Education</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {editing ? (
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={user.education}
                  />
                ) : (
                  <p>{user.education}</p>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">Workplace</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {editing ? (
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={user.currentWorkPlace}
                  />
                ) : (
                  <p>{user.currentWorkPlace}</p>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">Work Experience</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {editing ? (
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={user.workExperience}
                  />
                ) : (
                  <p>{user.workExperience}</p>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">What I can help with</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {editing ? (
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={user.whatCanHelpWith}
                  />
                ) : (
                  <p>{user.whatCanHelpWith}</p>
                )}
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
              <div className="col-sm-9 text-secondary">
                {!isOwner ? null : editing ? (
                  <input
                    type="button"
                    className="btn btn-primary px-4"
                    value="Stop Editing"
                    onClick={handleToggleEdit}
                  />
                ) : (
                  <input
                    type="button"
                    className="btn btn-primary px-4"
                    value="Edit"
                    onClick={handleToggleEdit}
                  />
                )}

                <span> </span>

                {editing && (
                  <input
                    type="button"
                    className="btn btn-primary px-4"
                    value="Save Changes"
                  />
                )}
              </div>
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
