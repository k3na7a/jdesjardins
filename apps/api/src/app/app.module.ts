import { AuthModule, UserModule } from '@jdesjardins/api-lib';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { typeOrmConfig } from '@jdesjardins/api-lib';

@Module({
  imports: [
    /** Config TypeORM */
    TypeOrmModule.forRoot(typeOrmConfig),
    /** Import Modules */
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
