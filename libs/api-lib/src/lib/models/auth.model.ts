import { IAccessToken } from '@jdesjardins/dist-lib';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserModel } from './user.model';

export class AccessTokenModel implements IAccessToken {
  @ApiProperty()
  access_token: string;
  // @ApiProperty()
  // refresh_token: string;
  @ApiProperty()
  user: UserModel;
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
