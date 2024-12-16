import { Injectable } from '@nestjs/common';
import { RedisRepository } from 'src/repositories/repository/redis.repository';

@Injectable()
export class RedisService {
  constructor(private readonly redisRepository: RedisRepository) {}

  async setReadFileJson(key: string, jsonData: string) {
    return await this.redisRepository.set(key, jsonData);
  }

  async getFileJson(key: string) {
    return await this.redisRepository.get(key);
  }
}
