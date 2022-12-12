import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../../../guards/local.auth.guard';
import { AuthService } from '../services/auth.service';
import { UserLoginModel, AccessTokenModel } from '@jdesjardins/dist-lib';

@Controller('')
@ApiTags('Authorization')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
