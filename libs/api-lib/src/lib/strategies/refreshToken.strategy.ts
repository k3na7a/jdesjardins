/* eslint-disable @typescript-eslint/no-explicit-any */
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { environment } from '../modules/auth/environments/environment';
import { UserService } from '../modules/users/services/user.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(private usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environment.RefreshTokenSecretKey,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: { email: string; sub: string }) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();

    const user = await this.usersService.findById(payload.sub);
    if (!user || !user.refreshToken) throw new ForbiddenException();
    const isMatch: boolean = user
      ? await bcrypt.compare(refreshToken, user.refreshToken)
      : null;
    if (!isMatch) throw new ForbiddenException();

    return { ...payload, refreshToken };
  }
}
