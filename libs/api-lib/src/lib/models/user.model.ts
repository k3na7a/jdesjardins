import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UserModel {
  @ApiProperty()
  public readonly id: string;
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
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password too weak. Must contain both Uppercase and Lowercase, at least 1 Digit, and be 8 or more characters long.',
  })
  public password: string;
}
