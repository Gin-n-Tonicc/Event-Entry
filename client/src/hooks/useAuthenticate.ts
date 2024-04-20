import { useEffect } from 'react';
import { useFetch } from 'use-http';
import { authPaths } from '../config/api';
import { useAuthContext } from '../contexts/AuthContext';
import { IAuthResponse } from '../types';
import { initialAuth } from '../utils';

// The hook that authenticates our user
export default function useAuthenticate(shouldLogoutUser: boolean = true) {
  const { user, loginUser, logoutUser } = useAuthContext();

  const { get, response, loading } = useFetch<IAuthResponse>(authPaths.me);

  // Authenticate user on mount
  useEffect(() => {
    async function fetchApi() {
      const data = await get();

      initialAuth.finishInitialAuth();

      if (response.ok) {
        loginUser(data);
      } else if (shouldLogoutUser) {
        logoutUser();
      }
    }

    fetchApi();
  }, []);

  return { user, loading };
}
