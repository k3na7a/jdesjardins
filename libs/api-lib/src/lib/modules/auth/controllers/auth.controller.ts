import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { LocalAuthGuard } from '../../../guards/local.auth.guard';
import { AuthService } from '../services/auth.service';
import { UserEntity } from '../../../entities';
import { UserService } from '../../users/services/user.service';
import { AccessTokenGuard } from '../../../guards/accessToken.guard';
import {
  AccessTokenModel,
  CreateUserModel,
  UserLoginModel,
} from '../../../models';

@Controller('')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @ApiBody({ type: CreateUserModel })
  @Put('register')
  createUser(@Body() params: CreateUserModel): Promise<UserEntity> {
    return this.userService.create(params);
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: UserLoginModel })
  @Post('login')
  login(@Request() req: { user: UserEntity }): Promise<AccessTokenModel> {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Get('me')
  getSelf(@Request() req: { user: UserEntity }): Promise<UserEntity> {
    return this.userService.findById(req.user.id);
  }
}
