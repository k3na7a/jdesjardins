import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { UserService } from '../../users/services/user.service';
import { LocalAuthGuard } from '../../../guards/local.auth.guard';
import { AuthService } from '../services/auth.service';
import {
  CreateUserModel,
  UserLoginModel,
  AccessTokenModel,
} from '@jdesjardins/dist-lib';
import { UserEntity } from '../../../entities';

@Controller('')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @ApiOkResponse({
    type: UserEntity,
  })
  @ApiBody({ type: CreateUserModel })
  @Put('register')
  createUser(@Body() params: CreateUserModel): Promise<UserEntity> {
    return this.userService.create(params);
  }

  @ApiOkResponse({
    type: AccessTokenModel,
  })
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: UserLoginModel })
  @Post('login')
  login(@Request() req): Promise<AccessTokenModel> {
    return this.authService.login(req.user);
  }
}
