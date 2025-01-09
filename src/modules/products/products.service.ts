import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/modules/products/repository/products.repository';
import { CreateProductsDto } from './dto/create-products-dto';
import { Products } from '@prisma/client';
import { UpdateProductsDto } from './dto/update-products-dto';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';
import NotFoundError from 'src/common/exceptions/not-found.exception';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productsRepository: ProductRepository,
  ) {}

  async createMany(dto: CreateProductsDto[]): Promise<Products[]> {
    try {
      const products = await this.productsRepository.createMany(dto);
      return products;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.SAVE_PRODUCTS);
    }
  }

  async findAll(): Promise<Products[]> {
    try {
      const products = await this.productsRepository.findAll();
      return products;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.RETRIEVE_PRODUCTS);
    }
  }

  async findById(id: string): Promise<Products> {
    try {
      const product = await this.productsRepository.findById(id);
      if (!product) {
        throw new NotFoundError(ERROR_MESSAGES.PRODUCT_NOT_FOUND, id);
      }
      return product;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(ERROR_MESSAGES.RETRIEVE_PRODUCTS);
    }
  }

  async delete(id: string): Promise<{ title: string }> {
    try {
      const product = await this.productsRepository.delete(id);
      if (!product) {
        throw new NotFoundError(ERROR_MESSAGES.PRODUCT_NOT_FOUND, id);
      }
      return product;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(ERROR_MESSAGES.DELETE_PRODUCT);
    }
  }

  async update(id: string, dto: UpdateProductsDto): Promise<Products> {
    try {
      const product = await this.productsRepository.update(id, dto);
      if (!product) {
        throw new NotFoundError(ERROR_MESSAGES.PRODUCT_NOT_FOUND, id);
      }
      return product;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(ERROR_MESSAGES.UPDATE_PRODUCT);
    }
  }
}
