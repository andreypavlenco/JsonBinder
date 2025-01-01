import { Injectable } from '@nestjs/common';
import { CreateProductsDto } from 'src/products/dto/create-products-dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class CacheService {
  constructor(private readonly redisService: RedisService) {}

  async cacheData(key: string, value: CreateProductsDto[]): Promise<void> {
    try {
      await this.redisService.setReadFileJson(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to set cache for key ${key}:`, error);
    }
  }

  async retrieveFromCache(key: string): Promise<CreateProductsDto[] | null> {
    try {
      const cachedData = await this.redisService.getFileJson(key);
      return cachedData ? JSON.parse(cachedData) : null;
    } catch (error) {
      return error;
    }
  }
}
