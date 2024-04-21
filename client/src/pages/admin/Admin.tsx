import { useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import useAuthenticate from '../../hooks/useAuthenticate';
import { PageEnum } from '../../types/enums/PageEnum';
import { RoleEnum } from '../../types/enums/RoleEnum';

// The component that decides if the user can access the admin panel
export default function Admin() {
  // Authenticate user
  const { user, loading } = useAuthenticate(false);
  const desiredRole = useMemo(() => RoleEnum.ADMIN, []);

  // If the user isn't an admin redirect to home
  // otherwise show the admin panel
  // show spinner if loading
  return (
    <>
      {!loading && user.role === desiredRole ? (
        <AdminView />
      ) : !loading && user.role !== desiredRole ? (
        <Navigate to={PageEnum.Home} />
      ) : (
        <Spinner />
      )}
    </>
  );
}

// The component that displays the admin panel
function AdminView() {
  return (
    <>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
