import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { Roles } from '../../../decorators/roles.decorator';
import { RolesGuard } from '../../../guards/roles.guard';
import {
  Role,
  Pagination,
  PaginationOptions,
  UpdateUserModel,
  UserModel,
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
  @Get('me')
  getSelf(@Request() request): Promise<UserModel> {
    return this.userService.findOneById(request.user.id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('')
  getAllUsers(
    @Query() pageOptions: PaginationOptions
  ): Promise<Pagination<UserEntity>> {
    return this.userService.findAll(pageOptions);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return this.userService.findOneById(id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: UpdateUserModel })
  @Patch(':id')
  updateUserById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatedUser: UpdateUserModel
  ): Promise<UserEntity> {
    return this.userService.update(id, updatedUser);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteUserById(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return this.userService.delete(id);
  }
}
