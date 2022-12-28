import { Role } from '../enums';
import { IBase } from './base.interfaces';

export interface IUser extends IBase {
  username: string;
  email: string;
  role: Role;
}

export interface IUserLogin {
  username: string;
  password: string;
}
