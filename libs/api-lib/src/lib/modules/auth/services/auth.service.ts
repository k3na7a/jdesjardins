import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../../entities';
import { AccessTokenModel, CreateUserModel } from '../../../models';
import { UserService } from '../../users/services/user.service';
import { environment } from '../environments/environment';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async register(dto: CreateUserModel): Promise<AccessTokenModel> {
    const user = await this.usersService.create(dto);
    const payload = { sub: user.id, email: user.email };

    const tokens = await this.getTokens(payload);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return { access_token: tokens.access_token, user };
  }

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.findOneByUsername(username);
    const isMatch = user ? await bcrypt.compare(password, user.password) : null;
    if (isMatch) return user;
    return null;
  }

  async getTokens(payload: {
    sub: string;
    email: string;
  }): Promise<{ access_token: string; refresh_token: string }> {
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

  async logout(userId: string) {
    return this.usersService.update(userId, { refreshToken: null });
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(refreshToken, salt);
    await this.usersService.update(id, {
      refreshToken: hash,
    });
  }

  async RefreshTokens(
    userId: string,
    refreshToken: string
  ): Promise<AccessTokenModel> {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken) throw new ForbiddenException();
    const isMatch: boolean = user
      ? await bcrypt.compare(refreshToken, user.refreshToken)
      : null;
    if (!isMatch) throw new ForbiddenException();

    const payload = { sub: user.id, email: user.email };
    const tokens = await this.getTokens(payload);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return { access_token: tokens.access_token, user };
  }

  async login(user: UserEntity): Promise<AccessTokenModel> {
    const payload = { email: user.email, sub: user.id };

    const tokens = await this.getTokens(payload);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return { access_token: tokens.access_token, user };
  }
}
