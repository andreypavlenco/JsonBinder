import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/repositories/repository/products.repository';
import { CreateProductsDto } from './dto/create-products-dto';
import { Products } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductRepository) {}

  async saveProductsFromJson(
    products: CreateProductsDto[],
  ): Promise<Products[]> {
    try {
      return await this.productsRepository.createManyFromJson(products);
    } catch (error) {
      console.error('Error saving products batch:', error);
      throw new BadRequestException('Error saving products', error);
    }
  }

  async findAllProducts(): Promise<Products[]> {
    try {
      return await this.productsRepository.findAll();
    } catch (error) {
      throw new BadRequestException('Error fetching products', error);
    }
  }

  async findOneProducts(id: string): Promise<Products> {
    try {
      return await this.productsRepository.findOne(id);
    } catch (error) {
      throw new BadRequestException('Error fetching products', error);
    }
  }

  async deleteOneProducts(id: string): Promise<Products> {
    try {
      return await this.productsRepository.delete(id);
    } catch (error) {
      throw new BadRequestException('Error fetching products', error);
    }
  }

  async updateOneProducts(
    id: string,
    dto: CreateProductsDto,
  ): Promise<Products> {
    try {
      return await this.productsRepository.update(id, dto);
    } catch (error) {
      throw new BadRequestException('Error fetching products', error);
    }
  }
}
