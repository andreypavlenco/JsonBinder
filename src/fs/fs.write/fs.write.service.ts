import { BadRequestException, Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';
import { BrandsCreateService } from 'src/brands-create-data/brands-create.service';
import { CategoriesCreateService } from 'src/categories-create-data/categories-create.service';
import { FileReadService } from 'src/fs/fs.read/fs.read.service';
import { writeFile, mkdir } from 'fs/promises';

@Injectable()
export class WriteFileService {
  constructor(
    private readonly updateProductService: UpdateProductService,
    private readonly readFileService: FileReadService,
  ) {}

  async saveUpdatedProducts(): Promise<void> {
    try {
      const products: Products[] = await this.readFileService.readData(
        './data/products.json',
      );
      const updatedProducts =
        await this.updateProductService.updateProductsWithBrandsAndCategories(
          products,
        );

      await writeFile(
        './data/products.json',
        JSON.stringify(updatedProducts, null, 2),
      );
    } catch (error) {
      throw new BadRequestException('Error saving updated products', error);
    }
  }
}
