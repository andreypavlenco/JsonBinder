import { RedisModule } from 'src/redis/redis.module';
import { CacheService } from './cache.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [RedisModule],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
