import { useCallback } from 'react';
import { Navigate, Outlet, To, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import { PageEnum, RoleEnum } from '../../../types';

type ProtectedRouteProps = {
  role: RoleEnum | null;
  onlyAuth?: boolean;
  blockNotFinishedOAuth?: boolean;
};

// The component that protects a route based on the user data
// whether he is logged or not, whether he is a teacher or not, etc.
export default function ProtectedRoute({
  role,
  onlyAuth,
  blockNotFinishedOAuth,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, hasFinishedOAuth2 } = useAuthContext();
  const { pathname } = useLocation();

  // Attach redirectTo search param
  const generateNavPath = useCallback(
    (path: string) => {
      const navPath: To = {
        pathname: path,
        search: `?redirect=${pathname}`,
      };
      return navPath;
    },
    [pathname]
  );

  if (user.role === RoleEnum.ADMIN) {
    return <Outlet />;
  }

  const passThrough =
    (!role && role == user.role) ||
    (role === user.role && isAuthenticated) ||
    (onlyAuth && isAuthenticated);

  if (passThrough && blockNotFinishedOAuth && !hasFinishedOAuth2) {
    return <Navigate to={PageEnum.Home} />;
  }

  if (!user.role && !passThrough && pathname !== PageEnum.Logout) {
    return <Navigate to={generateNavPath(PageEnum.Login)} />;
  }

  if (!passThrough) {
    return <Navigate to={PageEnum.Home} />;
  }

  return <Outlet />;
}
