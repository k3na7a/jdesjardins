import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
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

  @Column()
  refreshToken: string;

  @BeforeInsert()
  @BeforeUpdate()
  async insertUser() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
    }
    if (this.refreshToken) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(this.refreshToken, salt);
      this.refreshToken = hash;
    }
  }
}
