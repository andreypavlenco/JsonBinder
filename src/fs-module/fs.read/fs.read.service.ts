import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { CreateProductsDto } from 'src/products/dto/create-products-dto';

@Injectable()
export class ReadFileService {
  async readFile() {
    try {
      const content = await fs.readFile(
        'src/fs-module/fs.read/data.json',
        'utf8',
      );
      const products: CreateProductsDto[] = JSON.parse(content);
      return products;
    } catch (err) {
      throw new Error(`Error reading file: ${err.message}`);
    }
  }
}
