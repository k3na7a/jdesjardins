import { BaseInterface } from './base.interfaces';

export interface IUser extends BaseInterface {
  id: string;
  username: string;
  email: string;
}
