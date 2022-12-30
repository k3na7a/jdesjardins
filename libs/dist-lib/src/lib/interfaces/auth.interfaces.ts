import { IUser } from './user.interfaces';

export interface IAccessToken extends IUser {
  access_token: string;
  refresh_token: string;
}
