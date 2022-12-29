import { IUser } from '@jdesjardins/dist-lib';
import React, { createContext, useEffect } from 'react';
import { localAuthenticate } from '../apis';
import { useAxios } from '../hooks';
import { usePrivateAxiosInstance } from '../hooks';

interface AuthContextInterface {
  authenticatedUser: IUser | undefined;
  authenticate: () => void;
  cancel: () => void;
}

export const AuthContext = createContext<AuthContextInterface>({
  authenticatedUser: undefined,
  authenticate: () => {
    return;
  },
  cancel: () => {
    return;
  },
});

interface Children {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: Children) => {
  const [authenticatedUser, _loading, _error, authenticate, cancel] =
    useAxios<IUser>({
      instance: usePrivateAxiosInstance(localAuthenticate),
    });

  useEffect(() => {
    if (localStorage.getItem('AccessToken')) authenticate();
    return () => {
      cancel();
    };
  }, [authenticate, cancel]);

  return (
    <AuthContext.Provider
      value={{
        authenticatedUser,
        authenticate,
        cancel,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
