import * as path from 'path';
import { createReadStream } from 'fs';
import { Injectable, BadRequestException } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { CreateProductsDto } from 'src/products/dto/create-products-dto';

@Injectable()
export class ReadFileService {
  private readonly cacheKey = 'file:data';

  constructor(private readonly redisService: RedisService) {}

  private async cacheData(
    key: string,
    value: CreateProductsDto[],
  ): Promise<void> {
    try {
      await this.redisService.setReadFileJson(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to set cache for key ${key}:`, error);
    }
  }

  private async retrieveFromCache(
    key: string,
  ): Promise<CreateProductsDto[] | null> {
    try {
      const cachedData = await this.redisService.getFileJson(key);
      return cachedData ? JSON.parse(cachedData) : null;
    } catch (error) {
      return null;
    }
  }

  async readFile(): Promise<CreateProductsDto[]> {
    const cachedData = await this.retrieveFromCache(this.cacheKey);

    if (cachedData) {
      return cachedData;
    }
    return this.readFileFromDisk();
  }

  private async readFileFromDisk(): Promise<CreateProductsDto[]> {
    const absolutePath = path.join(process.cwd(), 'loading_files/data.json');

    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      const stream = createReadStream(absolutePath, { encoding: 'utf8' });

      stream.on('data', (chunk) => {
        chunks.push(Buffer.from(chunk));
      });

      stream.on('end', async () => {
        try {
          const fileContent = Buffer.concat(chunks).toString();
          const jsonData: CreateProductsDto[] = JSON.parse(fileContent);
          await this.cacheData(this.cacheKey, jsonData);
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
