import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/modules/products/repository/products.repository';
import { Products } from '@prisma/client';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';
import NotFoundError from 'src/common/exceptions/not-found.exception';
import { PRODUCT_REPOSITORY_TOKEN } from 'src/common/constants/repository-token';
import { CreateProductsDto, UpdateProductsDto } from './dto';
import { handleHttpException } from 'src/common/exceptions/handle-http.exception';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productsRepository: ProductRepository,
  ) {}

  async createMany(dto: CreateProductsDto[]): Promise<Products[]> {
    try {
      return await this.productsRepository.createMany(dto);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.SAVE_PRODUCTS);
    }
  }

  async findAll(): Promise<Products[]> {
    try {
      return await this.productsRepository.findAll();
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
      handleHttpException(error, ERROR_MESSAGES.RETRIEVE_PRODUCT);
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
      handleHttpException(error, ERROR_MESSAGES.DELETE_PRODUCT);
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
      handleHttpException(error, ERROR_MESSAGES.UPDATE_PRODUCT);
    }
  }
}
