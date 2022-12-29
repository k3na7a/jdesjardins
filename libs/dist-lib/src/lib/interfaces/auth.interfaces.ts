import { IUser } from './user.interfaces';

export interface IAccessToken {
  access_token: string;
  // refresh_token: string;
  user: IUser;
}
