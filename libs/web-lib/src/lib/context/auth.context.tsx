/* eslint-disable react-hooks/exhaustive-deps */
import { IUser } from '@jdesjardins/dist-lib';
import { AxiosError } from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { localhost } from '../apis';
import { useAxios } from '../hooks';

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

const TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlc2pqb2hAZ21haWwuY29tIiwic3ViIjoiMjVlMmM3ODktZmZmMC00NmU4LThjYjktNTVlZDY2NjZhNThjIiwiaWF0IjoxNjcxNjc5ODA2LCJleHAiOjE2NzE3NjYyMDZ9.AtncjSQ2vFcjWHHXhjT4ieblBPAddh2xqIW3kFPwZsI';

interface Props {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, loading, error, request] = useAxios<IUser>({
    instance: localhost,
    config: {
      method: 'GET',
      url: '/me',
      headers: {
        Authorization: TOKEN,
      },
    },
    loadOnStart: false,
    onSuccess: (res: IUser) => {
      console.log('Authentication Successful', res.username);
      setIsAuthenticated(true);
    },
    onError: (err: AxiosError) => {
      console.log('Authentication failure', err.message);
      setIsAuthenticated(false);
    },
  });

  useEffect(() => {
    request();
  }, []);

  const authenticate = () => {
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
