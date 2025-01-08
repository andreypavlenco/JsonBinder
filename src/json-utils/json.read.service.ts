import * as path from 'path';
import { createReadStream } from 'fs';
import { Injectable } from '@nestjs/common';
import { CreateProductsDto } from 'src/modules/products/dto/create-products-dto';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';

@Injectable()
export class ReadJsonService {
  constructor() {}

  async readJson(): Promise<CreateProductsDto[]> {
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
          resolve(jsonData);
        } catch (error) {
          reject(new Error(ERROR_MESSAGES.ERROR_READING_FILE));
        }
      });
    });
  }
}
