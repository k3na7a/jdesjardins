import { IAccessToken } from '@jdesjardins/dist-lib';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AccessTokenModel implements IAccessToken {
  @ApiProperty()
  access_token: string;
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
