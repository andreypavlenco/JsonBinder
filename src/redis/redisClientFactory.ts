import { FactoryProvider } from '@nestjs/common';
import Redis from 'ioredis';

export const redisClientFactory: FactoryProvider<Redis> = {
  provide: 'RedisClient',
  useFactory: () => {
    const redisInstanse = new Redis({
      host: 'localhost',
      port: 6379,
    });

    redisInstanse.on('error', (e) => {
      throw new Error(`Redis connection failed: ${e}`);
    });

    return redisInstanse;
  },
  inject: [],
};
