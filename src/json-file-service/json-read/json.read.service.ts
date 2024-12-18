import * as path from 'path';
import { createReadStream } from 'fs';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateProductsDto } from 'src/products/dto/create-products-dto';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class ReadFileService {
  private readonly cacheKey = 'file:data';

  constructor(private readonly cacheService: CacheService) {}

  async readFile(): Promise<CreateProductsDto[]> {
    const cachedData = await this.cacheService.retrieveFromCache(this.cacheKey);

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
          await this.cacheService.cacheData(this.cacheKey, jsonData);
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
