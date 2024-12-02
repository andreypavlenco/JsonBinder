import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Products } from '@prisma/client';
import { FileReadService } from 'src/fs/fs.read/fs.read.service';

@Injectable()
export class ProductsCreateService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly readFile: FileReadService,
  ) {}

  async create() {
    try {
      const products: Products[] = await this.readFile.readData(
        './data/products.json',
      );
      // const result = await this.prisma.products.createMany({
      //   data: products.map((product: Products) => ({
      //     brand_id: product.brandId,
      //     category_id: product.categoryId,
      //     title: product.title,
      //     price: product.price,
      //     img: product.img,
      //     brand: product.brand,
      //     description: product.description,
      //     rating: product.rating,
      //     createdAt: new Date(product.createdAt),
      //     updatedAt: new Date(product.updatedAt),
      //   })),
      // });
      return products;
      //   console.log(`${result.count} products inserted.`);
    } catch (error) {
      console.error('Error inserting products:', error);
    }
  }
}
