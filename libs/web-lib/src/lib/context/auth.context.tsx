/* eslint-disable react-hooks/exhaustive-deps */
import { AccessToken, IUser, IUserLogin } from '@jdesjardins/dist-lib';
import { AxiosError } from 'axios';
import React, { createContext, useState } from 'react';
import { localhost } from '../apis';
import { useAxios } from '../hooks';
import { usePrivateAxiosInstance } from '../hooks/usePrivateAxiosInstance.hook';

interface AuthContextInterface {
  isAuthenticated: boolean;
  authenticatedUser: IUser | undefined;
  authenticationIsLoading: boolean;
  authenticationHasError: AxiosError | undefined;
  authenticate: () => void;

  loginIsLoading: boolean;
  loginHasError: AxiosError | undefined;
  login: (data: IUserLogin) => void;
}

export const AuthContext = createContext<AuthContextInterface>({
  isAuthenticated: false,
  authenticatedUser: undefined,
  authenticationIsLoading: false,
  authenticationHasError: undefined,
  authenticate: () => {
    return;
  },

  loginIsLoading: false,
  loginHasError: undefined,
  login: (_data: IUserLogin) => {
    return;
  },
});

interface Children {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: Children) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [
    authenticatedUser,
    authenticationIsLoading,
    authenticationHasError,
    authenticate,
  ] = useAxios<IUser>({
    instance: usePrivateAxiosInstance(localhost),
    baseConfig: {
      method: 'GET',
      url: '/me',
    },
    onSuccess: () => {
      setIsAuthenticated(true);
    },
    onError: () => {
      setIsAuthenticated(false);
    },
  });
  const [, loginIsLoading, loginHasError, axiosLogin] = useAxios<AccessToken>({
    instance: localhost,
    baseConfig: {
      method: 'POST',
      url: '/login',
    },
    loadOnStart: false,
    onSuccess: (response: AccessToken) => {
      localStorage.setItem('AccessToken', response.access_token);
      authenticate();
    },
  });

  const login = (data: IUserLogin) => {
    axiosLogin({ data });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticatedUser,
        authenticationIsLoading,
        authenticationHasError,
        authenticate,
        loginIsLoading,
        loginHasError,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
