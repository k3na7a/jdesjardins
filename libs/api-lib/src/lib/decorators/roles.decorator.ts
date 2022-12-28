import { SetMetadata } from '@nestjs/common';
import { Role } from '@jdesjardins/dist-lib';

export const Roles = (roles: Role[]) => SetMetadata('roles', roles);
