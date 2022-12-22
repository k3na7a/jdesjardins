/* eslint-disable react-hooks/exhaustive-deps */
import { IUser } from '@jdesjardins/dist-lib';
import { AxiosError } from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { localhost } from '../apis';
import { useAxios } from '../hooks';
import { usePrivateAxiosInstance } from '../hooks/usePrivateAxiosInstance.hook';

interface AuthContextInterface {
  isAuthenticated: boolean;
  user: IUser | undefined;
  loading: boolean;
  error: AxiosError | undefined;
  authenticate: () => void;
}

export const AuthContext = createContext<AuthContextInterface>({
  isAuthenticated: false,
  user: undefined,
  loading: false,
  error: undefined,
  authenticate: () => {
    return;
  },
});

interface Children {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: Children) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, loading, error, request] = useAxios<IUser>({
    instance: usePrivateAxiosInstance(localhost),
    config: {
      method: 'GET',
      url: '/me',
    },
    loadOnStart: false,
    onSuccess: (res: IUser) => {
      console.log('Authentication success', res.username);
      setIsAuthenticated(true);
    },
    onError: (err: AxiosError) => {
      console.log('Authentication failure', err.message);
      setIsAuthenticated(false);
    },
  });

  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = () => {
    console.log('Authenticating...');
    request();
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, error, authenticate }}
    >
      {children}
    </AuthContext.Provider>
  );
};
