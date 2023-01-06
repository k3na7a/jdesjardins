import {
  IUser,
  PASSWORD_VALIDATION_MESSAGE,
  PASSWORD_VALIDATION_REGEX,
  Role,
  USERNAME_VALIDATION_MESSAGE,
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
  @ApiProperty()
  public role: Role;
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
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  public firstName?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  public lastName?: string;
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
    message: USERNAME_VALIDATION_MESSAGE,
  })
  public username: string;
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public email: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public firstName: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public lastName: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(PASSWORD_VALIDATION_REGEX, {
    message: PASSWORD_VALIDATION_MESSAGE,
  })
  public password: string;
}
