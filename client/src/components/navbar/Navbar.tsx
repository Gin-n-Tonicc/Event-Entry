import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { PageEnum, RoleEnum } from '../../types';
import profileUserIcon from './img/profile-user-icon.png';
import NavItem from './nav-item/NavItem';

function LoggedNav(props: {
  isOrganisation: boolean;
  hasFinishedOAuth2: boolean;
}) {
  return (
    <>
      <NavItem to={PageEnum.Logout} text="Log out" />
      <NavItem to={PageEnum.Profile} text="Profile" img={profileUserIcon} />
    </>
  );
}

function GuestNav() {
  return (
    <>
      <NavItem to={PageEnum.Login} text="Log In" />
      <NavItem to={PageEnum.Register} text="Sign In" />
    </>
  );
}

function UserNav(props: {
  isAuthenticated: boolean;
  isOrganisation: boolean;
  hasFinishedOAuth2: boolean;
}) {
  return (
    <>
      <NavItem to={PageEnum.Home} text="Home" />
      <NavItem to={PageEnum.Contact} text="Contact" />
      <div className="nav-item dropdown">
        <a
          href="#"
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown">
          Events
        </a>
        <div className="dropdown-menu rounded-0 m-0">
          <Link to={PageEnum.Events} className="dropdown-item">
            All Events
          </Link>
          {props.isOrganisation && (
            <Link to={PageEnum.EventsCreate} className="dropdown-item">
              Create Event
            </Link>
          )}
        </div>
      </div>
      {props.isAuthenticated ? <LoggedNav {...props} /> : <GuestNav />}
    </>
  );
}

function Navbar() {
  const { user, isAuthenticated, hasFinishedOAuth2 } = useAuthContext();

  const isOrganisation = RoleEnum.ORGANISATION === user.role;

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
      <Link
        to={PageEnum.Home}
        className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
        <h1 className="m-0 text-primary">EventEntry</h1>
      </Link>
      <button
        type="button"
        className="navbar-toggler me-4"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0 d-flex justify-content-evenly align-items-center">
          <UserNav
            isAuthenticated={isAuthenticated}
            isOrganisation={isOrganisation}
            hasFinishedOAuth2={hasFinishedOAuth2}
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
