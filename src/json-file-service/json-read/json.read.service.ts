import * as path from 'path';
import { createReadStream } from 'fs';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateProductsDto } from 'src/products/dto/create-products-dto';


@Injectable()
export class ReadFileService {
 

  constructor() {}

  async readFile(): Promise<CreateProductsDto[]> {
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
          reject(new BadRequestException('Invalid JSON format', error));
        }
      });

      stream.on('error', (error) => {
        reject(new BadRequestException(`Error reading file: ${error.message}`));
      });
    });
  }
}
