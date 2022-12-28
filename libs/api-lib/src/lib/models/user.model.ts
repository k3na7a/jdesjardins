import {
  IUser,
  PASSWORD_VALIDATION_REGEX,
  USERNAME_VALIDATION_REGEX,
} from '@jdesjardins/dist-lib';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { BaseModel } from './base.model';

export class UserModel extends BaseModel implements IUser {
  @ApiProperty()
  public username: string;
  @ApiProperty()
  public email: string;
}

export class UpdateUserModel {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public username?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  public email?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public refreshToken?: string;
}

export class CreateUserModel {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(USERNAME_VALIDATION_REGEX, {
    message:
      'Username must contain one lowercase letter, one uppercase letter, no space, no digits, no special characters, and it must be 4-16 chaaracters long.',
  })
  public username: string;
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public email: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(PASSWORD_VALIDATION_REGEX, {
    message:
      'Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.',
  })
  public password: string;
}
