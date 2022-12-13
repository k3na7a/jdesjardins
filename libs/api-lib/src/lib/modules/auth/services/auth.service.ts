import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../../entities';
import { AccessTokenModel } from '../../../models';
import { UserService } from '../../users/services/user.service';

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

  async login(user: UserEntity): Promise<AccessTokenModel> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
