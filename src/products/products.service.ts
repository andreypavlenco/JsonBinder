import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Products } from '@prisma/client';
import { ProductRepository } from 'src/repositories/repository/products.repository';
import { CreateProductsDto } from './dto/create-products-dto';

@Injectable()
export class ProductsCreateService {
  constructor(private readonly productsRepository: ProductRepository) {}

  createMany(dto: Products[]): Promise<Products[]> {
    try {
      return this.productsRepository.createMany(dto);
      // const products: Products[] = await this.readFile.readData(
      //   './data/products.json',
      // );
      //   console.log(`${result.count} products inserted.`);
    } catch (error) {
      console.error('Error inserting products:', error);
    }
  }
}
