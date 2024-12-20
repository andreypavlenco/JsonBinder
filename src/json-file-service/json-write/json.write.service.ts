import { BadRequestException, Injectable } from '@nestjs/common';
import { saveToFile } from './utils/save-to-file';
import { Brands, Categories, Products } from '@prisma/client';

@Injectable()
export class WriteFileService {
  constructor() {}

  async saveProductsToFile(products: Products[]): Promise<void> {
    try {
      return await saveToFile('unloading_files/products.json', products);
    } catch (error) {
      throw new BadRequestException('Error saving updated products', error);
    }
  }

  async saveBrandsToFile(brands: Brands[]): Promise<void> {
    try {
      return await saveToFile('unloading_files/brands.json', brands);
    } catch (error) {
      throw new BadRequestException('Error saving file brands', error);
    }
  }

  async saveCategoriesToFile(categories: Categories[]): Promise<void> {
    try {
      return await saveToFile('unloading_files/categories.json', categories);
    } catch (error) {
      throw new BadRequestException('Error saving file brands', error);
    }
  }
}
