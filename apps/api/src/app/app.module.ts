import { Module } from '@nestjs/common';
import { ApiModule } from '@jdesjardins/api-lib';

@Module({
  imports: [ApiModule],
})
export class AppModule {}
