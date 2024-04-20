import { PropsWithChildren, createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { IAuthResponse, IAuthStorage, IUser, RoleEnum } from '../types';
import { deleteJwtCookie, deleteRefreshCookie, isJwtExpired } from '../utils';

type AuthContextType = {
  user: Partial<IAuthStorage>;
  isAuthenticated: boolean;
  hasFinishedOAuth2: boolean;
  isOrganisation: boolean;
  updateUser: (v: IUser) => void;
  loginUser: (v: IAuthResponse) => void;
  logoutUser: () => void;
  removeJwt: () => void;
  removeRefresh: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const { value: auth, setStorageData: setAuth } =
    useLocalStorage<IAuthStorage>('auth', {});

  const updateUser: AuthContextType['updateUser'] = (object) => {
    setAuth((oldUser) => ({ ...oldUser, ...object }));
  };

  // Update state to the new user
  const loginUser: AuthContextType['loginUser'] = (authResponse) => {
    const user = authResponse.user;

    setAuth({
      id: user?.id,
      email: user?.email,
      firstname: user?.firstname,
      role: user?.role,
      education: user?.education,
      currentWorkPlace: user?.currentWorkPlace,
      workExperience: user?.workExperience,
      whatCanHelpWith: user?.whatCanHelpWith,
      additionalInfoRequired: user?.additionalInfoRequired,
      accessToken: authResponse.accessToken,
      refreshToken: authResponse.refreshToken,
    });
  };

  // Clear state and delete auth cookies
  const logoutUser: AuthContextType['logoutUser'] = () => {
    setAuth({});
    deleteJwtCookie();
    deleteRefreshCookie();
  };

  // Remove jwt (accessToken) from state and delete jwt cookie
  const removeJwt: AuthContextType['removeJwt'] = () => {
    deleteJwtCookie();
    setAuth((prev) => {
      const { accessToken, ...rest } = prev;
      return rest;
    });
  };

  // Remove refresh (refreshToken) from state and delete refresh cookie
  const removeRefresh: AuthContextType['removeRefresh'] = () => {
    deleteRefreshCookie();
    setAuth((prev) => {
      const { refreshToken, ...rest } = prev;
      return rest;
    });
  };

  // Prepare variables
  const isAuthenticated =
    Boolean(auth.accessToken) && !isJwtExpired(auth.accessToken);
  const hasFinishedOAuth2 =
    isAuthenticated && !Boolean(auth.additionalInfoRequired);

  const isOrganisation = auth.role === RoleEnum.ORGANISATION;

  return (
    <AuthContext.Provider
      value={{
        user: auth,
        isAuthenticated,
        hasFinishedOAuth2,
        isOrganisation,
        loginUser,
        logoutUser,
        updateUser,
        removeJwt,
        removeRefresh,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      'useAuthContext has to be used within <AuthContext.Provider>'
    );
  }

  return authContext;
};
