import { IBase } from './base.interfaces';

export interface IUser extends IBase {
  id: string;
  username: string;
  email: string;
}

export interface IUserLogin {
  username: string;
  password: string;
}
