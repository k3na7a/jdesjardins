import { IAccessToken } from '@jdesjardins/dist-lib';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { localLogin, localLogout, localRefresh } from '../apis';
import { useAxios } from '../hooks';
import { usePrivateAxiosInstance } from '../hooks';
import { useModal } from './modal.context';
import { AuthContextInterface, defaultAuthState } from './state/auth.state';

export const AuthContext =
  createContext<AuthContextInterface>(defaultAuthState);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
        message: `Login Successful`,
        variant: 'success',
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
      variant: 'success',
      timeout: 5000,
    });
  }, [addToast]);
  const [logout, cancel_logout] = useAxios<IAccessToken>({
    instance: usePrivateAxiosInstance(localLogout),
    onSuccess: onLogout,
    onResolve,
  });

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

export const useAuth = () => {
  return useContext(AuthContext);
};
