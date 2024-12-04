import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/repositories/repository/products.repository';
import { CreateProductsDto } from './dto/create-products-dto';
import { ReadFileService } from 'src/fs-module/fs.read/fs.read.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductRepository,
    private readonly readFileService: ReadFileService,
  ) {}

  async createMany(): Promise<{ count: number }> {
    try {
      const products: CreateProductsDto[] = await this.readFileService.readFile();
      return this.productsRepository.createMany(products);
    } catch (error) {
      console.error('Error inserting products:', error);
    }
  }
}
