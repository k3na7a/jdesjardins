import { IAccessToken } from '@jdesjardins/dist-lib';

export const defaultAuthState = {
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

export interface AuthContextInterface {
  authenticatedUser: IAccessToken | undefined;
  loading: boolean;

  authenticate: () => void;
  cancel: () => void;

  login: (data: { username: string; password: string }) => void;
  cancelLogin: () => void;

  logout: () => void;
  cancelLogout: () => void;
}
