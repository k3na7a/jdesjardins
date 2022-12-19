import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../entities/ormconfig';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    /** Config TypeORM */
    TypeOrmModule.forRoot(typeOrmConfig),
    /** Import Modules */
    AuthModule,
    UserModule,
  ],
})
export class ApiModule {}
