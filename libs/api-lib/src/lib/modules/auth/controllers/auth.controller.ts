import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { LocalAuthGuard } from '../../../guards/local.auth.guard';
import { AuthService } from '../services/auth.service';
import { UserEntity } from '../../../entities';
import { AccessTokenGuard } from '../../../guards/accessToken.guard';
import {
  AccessTokenModel,
  CreateUserModel,
  UserLoginModel,
} from '../../../models';
import { RefreshTokenGuard } from '../../../guards/refreshToken.guard';

@Controller('')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: CreateUserModel })
  @Put('register')
  createUser(@Body() params: CreateUserModel): Promise<AccessTokenModel> {
    return this.authService.register(params);
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: UserLoginModel })
  @Post('login')
  login(@Request() req: { user: UserEntity }): Promise<AccessTokenModel> {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: { user: UserEntity }): Promise<UserEntity> {
    return this.authService.logout(req.user.id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(RefreshTokenGuard)
  @UseGuards()
  @Get('refresh')
  refreshTokens(@Req() req: { user: UserEntity }): Promise<AccessTokenModel> {
    return this.authService.RefreshTokens(req.user.id, req.user.refreshToken);
  }
}
