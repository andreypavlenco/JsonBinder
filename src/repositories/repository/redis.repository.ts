import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisRepository implements OnModuleDestroy {
  constructor(@Inject('RedisClient') private readonly redisClient: Redis) {}

  onModuleDestroy() {
    this.redisClient.disconnect();
  }

  async set(key: string, value: string): Promise<string | null> {
    return await this.redisClient.set(`${key}`, value);
  }

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(`${key}`);
  }

  async delete(key: string): Promise<void> {
    await this.redisClient.del(`${key}`);
  }
}
