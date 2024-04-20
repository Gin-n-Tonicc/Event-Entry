import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from 'use-http';
import Spinner from '../../../components/spinner/Spinner';
import { authPaths } from '../../../config/api';
import { useAuthContext } from '../../../contexts/AuthContext';
import { PageEnum } from '../../../types';

// The component used to handle logout
export default function Logout() {
  const { logoutUser } = useAuthContext();
  const navigate = useNavigate();

  // Logout on mount
  const { loading } = useFetch(authPaths.logout, []);

  // Clear user from state and redirect to home
  useEffect(() => {
    if (!loading) {
      logoutUser();
      navigate(PageEnum.Home);
    }
  }, [loading]);

  return <Spinner />;
}
