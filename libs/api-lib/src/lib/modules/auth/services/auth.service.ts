import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../../entities';
import { AccessTokenModel } from '../../../models';
import { UserService } from '../../users/services/user.service';
import { environment } from '../environments/environment';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.findOneByUsername(username);
    const isMatch = user ? await bcrypt.compare(password, user.password) : null;
    if (isMatch) return user;
    return null;
  }

  async getTokens(payload: { sub: string; email: string }) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: environment.JwtSecretKey,
        expiresIn: '1h',
      }),
      this.jwtService.signAsync(payload, {
        secret: environment.RefreshTokenSecretKey,
        expiresIn: '7d',
      }),
    ]);
    return { access_token, refresh_token };
  }

  async login(user: UserEntity): Promise<AccessTokenModel> {
    const payload = { email: user.email, sub: user.id };
    return this.getTokens(payload);
  }
}
