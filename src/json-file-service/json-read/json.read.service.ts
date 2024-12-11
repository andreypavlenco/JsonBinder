import * as path from 'path';
import { createReadStream } from 'fs';
import { Injectable, BadRequestException } from '@nestjs/common';
import { RedisService } from 'src/cache-redis/redis.service';

@Injectable()
export class ReadFileService {
  constructor(private readonly redisService: RedisService) {}

  private async setCacheRedis(key: string, value): Promise<string | null> {
    try {
      return await this.redisService.setReadFileJson(key, value);
    } catch (error) {
      console.error(`Failed to set cache for key ${key}:`, error);
      return null;
    }
  }

  private async getCacheRedis(key: string): Promise<string | null> {
    try {
      return await this.redisService.getFileJson(key);
    } catch (error) {
      console.error(`Failed to get cache for key ${key}:`, error);
      return null;
    }
  }

  private async heckCacheForJson(): Promise<string | null> {
    const cacheKey = 'file:data';

    const cachedData = await this.getCacheRedis(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    } else return null;
  }

  async readJson(): Promise<any> {
    const cacheData = await this.heckCacheForJson();

    if (cacheData !== null) {
      return cacheData;
    }

    return new Promise((resolve, reject) => {
      const absolutePath = path.join(process.cwd(), 'loading_files/data.json');
      const chunks: Buffer[] = [];
      const stream = createReadStream(absolutePath, { encoding: 'utf8' });

      stream.on('data', (chunk) => {
        chunks.push(Buffer.from(chunk));
      });

      stream.on('end', () => {
        try {
          const fileContent = Buffer.concat(chunks).toString();
          const jsonData = JSON.parse(fileContent);
          this.setCacheRedis('file:data', jsonData);
          resolve(jsonData);
        } catch (error) {
          reject(new BadRequestException('Invalid JSON format', error));
        }
      });

      stream.on('error', (error) => {
        reject(new BadRequestException(`Error reading file: ${error.message}`));
      });
    });
  }
}
