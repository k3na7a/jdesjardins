import { SetMetadata } from '@nestjs/common';
import { Role } from '@jdesjardins/dist-lib';

export const Roles = (role: Role) => SetMetadata('role', role);
