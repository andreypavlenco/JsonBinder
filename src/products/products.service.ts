import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProductRepository } from 'src/repositories/repository/products.repository';
import { CreateProductsDto } from './dto/create-products-dto';
import { Products } from '@prisma/client';
import { UpdateProductsDto } from './dto/update-products-dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductRepository) {}

  async saveProductsFromJson(
    products: CreateProductsDto[],
  ): Promise<Products[]> {
    try {
      return await this.productsRepository.createManyFromJson(products);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to save products. Please try again later.',
      );
    }
  }

  async findAll(): Promise<Products[]> {
    try {
      return await this.productsRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve products. Please try again later.',
      );
    }
  }

  async findId(id: string): Promise<Products> {
    try {
      const product = await this.productsRepository.findOne(id);
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found.`);
      }
      return product;
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException(
            'Failed to retrieve the product. Please try again later.',
          );
    }
  }

  async delete(id: string): Promise<{ title: string }> {
    try {
      const result = await this.productsRepository.delete(id);
      if (!result) {
        throw new NotFoundException(`Product with ID ${id} not found.`);
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete the product. Please try again later.',
      );
    }
  }

  async update(id: string, dto: UpdateProductsDto): Promise<Products> {
    try {
      const updatedProduct = await this.productsRepository.update(id, dto);
      if (!updatedProduct) {
        throw new NotFoundException(`Product with ID ${id} not found.`);
      }
      return updatedProduct;
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error.message);
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException(
            'Failed to update the product. Please try again later.',
          );
    }
  }
}
