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

  const mappedFriends = friends.map((x) => x.friend);
  const isOwner = userMe.id === user.id;

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
            <hr className="my-4" />
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 className="mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-globe me-2 icon-inline">
                    <circle cx={12} cy={12} r={10} />
                    <line x1={2} y1={12} x2={22} y2={12} />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  Website
                </h6>
                <span className="text-secondary">https://bootdey.com</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 className="mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-github me-2 icon-inline">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  Github
                </h6>
                <span className="text-secondary">bootdey</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 className="mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-twitter me-2 icon-inline text-info">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                  Twitter
                </h6>
                <span className="text-secondary">@bootdey</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 className="mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-instagram me-2 icon-inline text-danger">
                    <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  Instagram
                </h6>
                <span className="text-secondary">bootdey</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 className="mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-facebook me-2 icon-inline text-primary">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  Facebook
                </h6>
                <span className="text-secondary">bootdey</span>
              </li>
            </ul>
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
          <ProfileFriends friends={mappedFriends} refresh={refreshFriends} />
          {isOwner && (
            <ProfileFriendRequests user={user} refresh={refreshFriends} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
