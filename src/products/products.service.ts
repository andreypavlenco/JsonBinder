import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/repositories/repository/products.repository';
import { CreateProductsDto } from './dto/create-products-dto';
import { Products } from '@prisma/client';
import { UpdateProductsDto } from './dto/update-products-dto';
import { ErrorHandlerService } from 'src/shared/error-handler/error-handler.service';
import { ERROR_MESSAGES } from 'src/shared/ constants/error-messages';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductRepository,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  async saveProductsFromJson(
    products: CreateProductsDto[],
  ): Promise<Products[]> {
    try {
      return await this.productsRepository.createManyFromJson(products);
    } catch (error) {
      this.errorHandler.handleInternalServerError(
        error,
        ERROR_MESSAGES.SAVE_PRODUCTS,
      );
    }
  }

  async findAll(): Promise<Products[]> {
    try {
      return await this.productsRepository.findAll();
    } catch (error) {
      this.errorHandler.handleInternalServerError(
        error,
        ERROR_MESSAGES.SAVE_PRODUCTS,
      );
    }
  }

  async findId(id: string): Promise<Products> {
    try {
      const product = await this.productsRepository.findById(id);
      if (!product) {
        this.errorHandler.handleNotFound('Product', `with ID ${id}`);
      }
      return product;
    } catch (error) {
      this.errorHandler.handleInternalServerError(
        error,
        ERROR_MESSAGES.RETRIEVE_PRODUCT,
      );
    }
  }

  async delete(id: string): Promise<{ title: string }> {
    try {
      const result = await this.productsRepository.delete(id);
      if (!result) {
        this.errorHandler.handleNotFound('Product', `with ID ${id}`);
      }
      return result;
    } catch (error) {
      this.errorHandler.handleBadRequest(error, ERROR_MESSAGES.DELETE_PRODUCT);
    }
  }

  async update(id: string, dto: UpdateProductsDto): Promise<Products> {
    try {
      const updatedProduct = await this.productsRepository.update(id, dto);
      if (!updatedProduct) {
        this.errorHandler.handleNotFound('Product', `with ID ${id}`);
      }
      return updatedProduct;
    } catch (error) {
      this.errorHandler.handleBadRequest(error, ERROR_MESSAGES.UPDATE_PRODUCT);
    }
  }
}
