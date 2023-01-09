import { IAccessToken } from '@jdesjardins/dist-lib';
import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { localLogin, localLogout, localRefresh } from '../apis';
import { useAxios } from '../hooks';
import { usePrivateAxiosInstance } from '../hooks';
import { useModal } from './modal.context';

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

  const { addToast } = useModal();

  const onResolve = useCallback(() => {
    setLoading(false);
  }, []);

  const onLogin = useCallback(
    (res: IAccessToken) => {
      localStorage.setItem('AccessToken', res.refresh_token);
      setAuthenticatedUser(res);
      addToast({
        title: 'Success',
        message: `Login as ${res.role} ${res.username}`,
        timeout: 5000,
      });
    },
    [addToast]
  );
  const [login, cancel_login] = useAxios<IAccessToken>({
    instance: usePrivateAxiosInstance(localLogin),
    onSuccess: onLogin,
    onResolve,
  });

  const onRefresh = useCallback((res: IAccessToken) => {
    localStorage.setItem('AccessToken', res.refresh_token);
    setAuthenticatedUser(res);
  }, []);
  const [authenticate, cancel_auth] = useAxios<IAccessToken>({
    instance: usePrivateAxiosInstance(localRefresh),
    onSuccess: onRefresh,
    onResolve,
  });

  const onLogout = useCallback(() => {
    localStorage.removeItem('AccessToken');
    setAuthenticatedUser(undefined);
    addToast({
      title: 'Success',
      message: 'Logout Successful',
      timeout: 5000,
    });
  }, [addToast]);
  const [logout, cancel_logout] = useAxios<IAccessToken>({
    instance: usePrivateAxiosInstance(localLogout),
    onSuccess: onLogout,
    onResolve,
  });

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

  // useEffect called twice in dev mode due to React Strict Mode,
  // need to find a better way to handle this!!
  const effectCalled = useRef<boolean>(false);

  useEffect(() => {
    if (effectCalled.current) {
      if (localStorage.getItem('AccessToken')) authenticate();
      else setLoading(false);
    }

    effectCalled.current = true;

    return () => {
      cancel_auth();
    };
  }, [authenticate, cancel_auth]);

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
