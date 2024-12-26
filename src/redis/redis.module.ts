import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisRepository } from 'src/repositories/repository/redis.repository';
import { redisClientFactory } from './redisClientFactory';

@Module({
  imports: [],
  controllers: [],
  providers: [RedisService, RedisRepository, redisClientFactory],
  exports: [RedisService],
})
export class RedisModule {}
