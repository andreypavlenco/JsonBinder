import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { CreateProductsDto } from 'src/products/dto/create-products-dto';

@Injectable()
export class ReadFileService {
  async readFile() {
    try {
      const absolutePath = join(process.cwd(), 'src/fs-module/fs.read/data.json');
      console.log('Reading file from:', absolutePath);
      const content = await fs.readFile('src/fs-module/fs.read/data.json', 'utf8');
      const products: CreateProductsDto[] = JSON.parse(content);
      return products;
    } catch (err) {
      throw new Error(`Error reading file: ${err.message}`);
    }
  }
}

