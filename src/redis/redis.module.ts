import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RepositoryModule } from 'src/repositories/repository/repository.module';
import { RedisRepository } from 'src/repositories/repository/redis.repository';
import { redisClientFactory } from './redisClientFactory';

@Module({
  imports: [RepositoryModule],
  controllers: [],
  providers: [RedisService, RedisRepository, redisClientFactory],
  exports: [RedisService],
})
export class RedisModule {}
