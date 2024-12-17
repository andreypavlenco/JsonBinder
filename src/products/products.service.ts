import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/repositories/repository/products.repository';
import { CreateProductsDto } from './dto/create-products-dto';
import { Products } from '@prisma/client';
import { UpdateProductsDto } from './dto/update-products-dto';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';

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
      this.errorHandler.handle(error, 'Failed to save products.');
    }
  }

  async findAll(): Promise<Products[]> {
    try {
      return await this.productsRepository.findAll();
    } catch (error) {
      this.errorHandler.handle(error, 'Failed to fetch products.');
    }
  }

  async findId(id: string): Promise<Products> {
    try {
      const product = await this.productsRepository.findOne(id);
      if (!product) {
        this.errorHandler.handleNotFound('Product', `with ID ${id}`);
      }
      return product;
    } catch (error) {
      this.errorHandler.handle(error, 'Failed to fetch products by ID.');
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
      this.errorHandler.handle(error, 'Failed to delete products.');
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
      this.errorHandler.handle(error, 'Failed to update products.');
    }
  }
}
