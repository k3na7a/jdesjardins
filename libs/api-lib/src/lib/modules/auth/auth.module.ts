import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../../modules/users/user.module';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { AccessTokenStrategy, LocalStrategy } from '../../strategies';
import { RefreshTokenStrategy } from '../../strategies/refreshToken.strategy';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    LocalStrategy,
  ],
})
export class AuthModule {}
