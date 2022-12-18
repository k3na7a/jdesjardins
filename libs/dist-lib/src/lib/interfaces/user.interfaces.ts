import { IBase } from './base.interfaces';

export interface IUser extends IBase {
  id: string;
  username: string;
  email: string;
}
