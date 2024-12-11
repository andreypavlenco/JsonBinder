import { Module } from '@nestjs/common';
import { ReadFileService } from './json.read.service';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [ReadFileService],
  exports: [ReadFileService],
})
export class ReadFileModule {}
