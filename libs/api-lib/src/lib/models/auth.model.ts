import { IAccessToken, IUser } from '@jdesjardins/dist-lib';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserModel } from './user.model';

interface AccessTokenModelParameters {
  tokens: {
    access_token: string;
    refresh_token: string;
  };
  user: IUser;
}

export class AccessTokenModel extends UserModel implements IAccessToken {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  refresh_token: string;

  constructor({ tokens, user }: AccessTokenModelParameters) {
    super();

    this.access_token = tokens.access_token;
    this.refresh_token = tokens.refresh_token;
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
