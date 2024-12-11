import { Module } from '@nestjs/common';
import { RedisRepository } from 'src/repositories/repository/redis.repository';
import { RedisService } from './redis.service';

@Module({
  imports: [RedisRepository],
  controllers: [],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
