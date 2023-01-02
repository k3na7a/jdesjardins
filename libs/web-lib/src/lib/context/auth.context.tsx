import { IAccessToken } from '@jdesjardins/dist-lib';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { localLogin, localLogout, localRefresh } from '../apis';
import { useAxios } from '../hooks';
import { usePrivateAxiosInstance } from '../hooks';

interface AuthContextInterface {
  authenticatedUser: IAccessToken | undefined;
  loading: boolean;

  authenticate: () => void;
  cancel: () => void;

  login: (data: { username: string; password: string }) => void;
  cancelLogin: () => void;

  logout: () => void;
  cancelLogout: () => void;
}

interface Props {
  children: React.ReactNode;
}

const defaultState = {
  authenticatedUser: undefined,
  loading: true,
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
  logout: () => {
    return;
  },
  cancelLogout: () => {
    return;
  },
};

export const AuthContext = createContext<AuthContextInterface>(defaultState);

export const AuthContextProvider = ({ children }: Props) => {
  const [authenticatedUser, setAuthenticatedUser] = useState<IAccessToken>();
  const [loading, setLoading] = useState<boolean>(true);

  const onSuccess = useCallback((res: IAccessToken) => {
    localStorage.setItem('AccessToken', res.refresh_token);
    setAuthenticatedUser(res);
  }, []);

  const onResolve = useCallback(() => {
    setLoading(false);
  }, []);

  const onLogout = useCallback(() => {
    localStorage.removeItem('AccessToken');
    setAuthenticatedUser(undefined);
  }, []);

  const [login, cancel_login] = useAxios<IAccessToken>({
    instance: usePrivateAxiosInstance(localLogin),
    onSuccess,
    onResolve,
  });
  const [logout, cancel_logout] = useAxios<IAccessToken>({
    instance: usePrivateAxiosInstance(localLogout),
    onSuccess: onLogout,
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
        loading,

        authenticate,
        cancel: cancel_auth,

        login: Login,
        cancelLogin: cancel_login,

        logout: Logout,
        cancelLogout: cancel_logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
