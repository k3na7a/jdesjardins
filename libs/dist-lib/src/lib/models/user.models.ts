interface IUser {
  id: string;
  username: string;
  email: string;
}

export class User implements IUser {
  public readonly id!: string;
  public username!: string;
  public email!: string;
  constructor(params?: IUser) {
    const param: IUser = {
      id: params.id,
      username: params.username,
      email: params.email,
    };
    Object.assign(this, param);
  }
}
