import { IAccessToken, IUser } from '@jdesjardins/dist-lib';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserModel } from './user.model';

interface AccessTokenModelParameters {
  tokens?: {
    access_token: string;
    refresh_token: string;
  };
  user: IUser;
}

export class AccessTokenModel extends UserModel implements IAccessToken {
  @ApiProperty()
  access_token: string | null;
  @ApiProperty()
  refresh_token: string | null;

  constructor({ tokens, user }: AccessTokenModelParameters) {
    super();

    this.access_token = tokens?.access_token || null;
    this.refresh_token = tokens?.refresh_token || null;
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.role = user.role;
    this.updated = user.updated;
    this.created = user.created;
  }
}

export class UserLoginModel {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
