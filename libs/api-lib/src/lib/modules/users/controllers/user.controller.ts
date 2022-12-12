import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { Roles } from '../../../decorators/roles.decorator';
import { RolesGuard } from '../../../guards/roles.guard';
import {
  Role,
  Pagination,
  UserModel,
  PaginationOptions,
  UpdateUserModel,
} from '@jdesjardins/dist-lib';
import { UserEntity } from '../../../entities';

@ApiBearerAuth('access-token')
@ApiTags('User Management')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** Self Management */
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: UserEntity,
  })
  @Get('me')
  getSelf(@Request() request): Promise<UserEntity> {
    return this.userService.findOneById(request.user.id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('')
  getAllUsers(
    @Query() pageOptions: PaginationOptions
  ): Promise<Pagination<UserModel>> {
    return this.userService.findAll(pageOptions);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({
    type: UserEntity,
  })
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({
    type: UserEntity,
  })
  @ApiBody({ type: UpdateUserModel })
  @Patch(':id')
  updateUserById(
    @Param('id') id: string,
    @Body() updatedUser: UpdateUserModel
  ): Promise<UserEntity> {
    return this.userService.update(id, updatedUser);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({
    type: UserEntity,
  })
  @Delete(':id')
  deleteUserById(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.delete(id);
  }
}
