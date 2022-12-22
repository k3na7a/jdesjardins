import { IUser, PASSWORD_VALIDATION_REGEX } from '@jdesjardins/dist-lib';
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
}

export class CreateUserModel {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
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
      'Password too weak. Must contain both Uppercase and Lowercase, at least 1 Digit, and be 8 or more characters long.',
  })
  public password: string;
}
