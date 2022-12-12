import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@jdesjardins/dist-lib';

const validate = (requiredRole: Role, role: Role) => {
  return role === requiredRole;
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<Role>('role', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRole) return true;
    const request = context.switchToHttp().getRequest();
    return validate(requiredRole, request.user.role);
  }
}
