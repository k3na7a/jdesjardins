import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AccessTokenModel {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  refresh_token: string;
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
