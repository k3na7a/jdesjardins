import { IAccessToken, IUser } from '@jdesjardins/dist-lib';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { localLogin, localLogout, localRefresh } from '../apis';
import { useAxios } from '../hooks';
import { usePrivateAxiosInstance } from '../hooks';

interface AuthContextInterface {
  authenticatedUser: IUser | undefined;
  authenticate: () => void;
  cancel: () => void;
  login: (data: { username: string; password: string }) => void;
  cancelLogin: () => void;
}

interface Props {
  children: React.ReactNode;
}

const defaultState = {
  authenticatedUser: undefined,
  authenticate: () => {
    return;
  },
  cancel: () => {
    return;
  },
  login: () => {
    return;
  },
  cancelLogin: () => {
    return;
  },
};

export const AuthContext = createContext<AuthContextInterface>(defaultState);

export const AuthContextProvider = ({ children }: Props) => {
  const [authenticatedUser, setAuthenticatedUser] = useState<IAccessToken>();
  const [loading, setLoading] = useState<boolean>(true);

  const onSuccess = useCallback((res: IAccessToken) => {
    setAuthenticatedUser(res);
  }, []);
  const onResolve = useCallback(() => {
    setLoading(false);
  }, []);

  const [login, cancel_login] = useAxios<IAccessToken>({
    instance: usePrivateAxiosInstance(localLogin),
    onSuccess,
    onResolve,
  });
  const [logout, cancel_logout] = useAxios<IAccessToken>({
    instance: usePrivateAxiosInstance(localLogout),
    onResolve,
  });
  const [authenticate, cancel_auth] = useAxios<IAccessToken>({
    instance: usePrivateAxiosInstance(localRefresh),
    onSuccess,
    onResolve,
  });

  useEffect(() => {
    if (localStorage.getItem('AccessToken')) authenticate();
    else setLoading(false);
    return () => {
      cancel_auth();
    };
  }, [authenticate, cancel_auth]);

  const Login = useCallback(
    (data: { username: string; password: string }) => {
      setLoading(true);
      login({ data });
    },
    [login]
  );

  const Logout = useCallback(() => {
    setLoading(true);
    logout();
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        authenticatedUser,
        authenticate,
        cancel: cancel_auth,
        login: Login,
        cancelLogin: cancel_login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
