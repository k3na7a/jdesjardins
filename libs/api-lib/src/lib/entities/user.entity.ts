import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IUser, Role } from '@jdesjardins/dist-lib';
import BaseEntity from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class UserEntity extends BaseEntity implements IUser {
  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @ApiProperty({ enum: Role })
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({ nullable: true })
  refreshToken!: string;
}
