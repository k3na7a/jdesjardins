import { IBase } from './base.interfaces';

export interface IUser extends IBase {
  username: string;
  email: string;
}

export interface IUserLogin {
  username: string;
  password: string;
}
