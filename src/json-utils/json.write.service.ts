import { Injectable } from '@nestjs/common';
import { Brands, Categories, Products } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';

export type WriteFileData = Products[] | Brands[] | Categories[];

@Injectable()
export class WriteJsonService {
  constructor() {}

  writeProductsToJson(products: Products[]) {
    return this.writeToJson('unloading_files/products.json', products);
  }

  writeBrandsToJson(brands: Brands[]) {
    return this.writeToJson('unloading_files/brands.json', brands);
  }

  writeCategoriesToJson(categories: Categories[]) {
    return this.writeToJson('unloading_files/categories.json', categories);
  }

  private async writeToJson(
    relativePath: string,
    data: WriteFileData,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const absolutePath = path.join(process.cwd(), relativePath);
        const writeStream = fs.createWriteStream(absolutePath);

        const jsonData = JSON.stringify(data, null, 2);

        writeStream.on('finish', () => {
          resolve();
        });

        writeStream.write(jsonData);

        writeStream.end();
      } catch (error) {
        reject(new Error(ERROR_MESSAGES.ERROR_WRITING_FILE + relativePath));
      }
    });
  }
}
