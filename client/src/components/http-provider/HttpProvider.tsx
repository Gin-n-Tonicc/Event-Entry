import { PropsWithChildren } from 'react';
import { CachePolicies, CustomOptions, Provider, useFetch } from 'use-http';
import { authPaths } from '../../config/api';
import { useAuthContext } from '../../contexts/AuthContext';
import { useErrorContext } from '../../contexts/ErrorContext';
import { IUser } from '../../types';
import { initialAuth, isJwtExpired } from '../../utils';

// The component that is responsible for the useFetch hook options
export default function HttpProvider({ children }: PropsWithChildren) {
  const { isAuthenticated, user, removeJwt, removeRefresh } = useAuthContext();
  const { addError } = useErrorContext();

  // Prepare refresh token fetch
  const { get } = useFetch<IUser>(authPaths.refreshToken());

  const removeTokensIfExpired = () => {
    if (isJwtExpired(user.accessToken)) {
      removeJwt();
    }

    if (isJwtExpired(user.refreshToken)) {
      removeRefresh();
    }
  };

  const refreshToken = async () => {
    await get();
  };

  const options: Partial<CustomOptions> = {
    interceptors: {
      // Request interceptor (before sending the request)
      request: async ({ options, url }) => {
        const pathname = new URL(url || '').pathname;

        const isRefreshRequest = pathname.includes(authPaths.refreshTokenPath);

        removeTokensIfExpired();

        const isExpired = !Boolean(user.accessToken) && !isAuthenticated;

        if (!isRefreshRequest && isExpired) {
          await refreshToken();
        }

        // Include cookies
        options.credentials = 'include';
        return options;
      },
      // Response interceptor (After receiving the response, before sending it to the user)
      response: async ({ response }) => {
        if (!response.ok) {
          if (
            !initialAuth.hasFinishedInitialAuth() &&
            response.status === 401
          ) {
            return response;
          }

          const message = response.data.message || '';
          addError(message);
        }

        return response;
      },
    },
    cachePolicy: CachePolicies.NO_CACHE,
    // default is:
    // cachePolicy: CachePolicies.CACHE_FIRST
  };

  return (
    <Provider url={process.env.REACT_APP_API_URL} options={options}>
      {children}
    </Provider>
  );
}
