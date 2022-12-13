import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../entities';
import { CreateUserModel, Pagination, PaginationMeta, PaginationOptions, UpdateUserModel } from '../../../models';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {}

  async paginate(
    pageOptions: PaginationOptions
  ): Promise<Pagination<UserEntity>> {
    const [data, total] = await this.userRepository.findAndCount({
      order: { created: 'ASC' },
      skip: pageOptions.skip,
      take: pageOptions.take,
    });
    const pageMetaDto = new PaginationMeta({ pageOptions, itemCount: total });
    return new Pagination<UserEntity>(data, pageMetaDto);
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    return user;
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    return user;
  }

  async create(user: CreateUserModel): Promise<UserEntity> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async update(id: string, dto: UpdateUserModel): Promise<UserEntity> {
    const user = await this.findById(id);
    const updatedUser = Object.assign(user, dto);
    return this.userRepository.save(updatedUser);
  }

  async delete(id: string): Promise<UserEntity> {
    const user = await this.findById(id);
    return this.userRepository.remove(user);
  }
}
