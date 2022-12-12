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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../../../guards/local.auth.guard';
import { AuthService } from '../services/auth.service';
import {
  UserLoginModel,
  AccessTokenModel,
  CreateUserModel,
} from '@jdesjardins/dist-lib';
import { UserEntity } from '../../../entities';
import { UserService } from '../../users/services/user.service';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';

@Controller('')
@ApiTags('Authorization')
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
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getSelf(@Request() req: { user: UserEntity }): Promise<UserEntity> {
    return this.userService.findById(req.user.id);
  }
}
