import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/repositories/repository/products.repository';
import { CreateProductsDto } from './dto/create-products-dto';
import { ReadFileService } from 'src/json-file-service/json-read/json.read.service';
import { Products } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductRepository,
    private readonly readFileService: ReadFileService,
  ) {}

  async createProductsFromFile(): Promise<Products[]> {
    try {
      const dbProducts = await this.findAll();
      const inputProducts = await this.loadProducts();
      return await this.filterAndSaveUniqueProducts(dbProducts, inputProducts);
    } catch (error) {
      throw new BadRequestException('Error processing products', error);
    }
  }

  private async loadProducts(): Promise<CreateProductsDto[]> {
    try {
      return await this.readFileService.readFile();
    } catch (error) {
      throw new BadRequestException('Error reading products from file', error);
    }
  }

  private async filterAndSaveUniqueProducts(
    dbProducts: Products[],
    inputProducts: CreateProductsDto[],
  ): Promise<Products[]> {
    const newProducts = inputProducts.filter((product) => {
      return !dbProducts.some((dbProduct) => dbProduct.title === product.title);
    });

    if (newProducts.length > 0) {
      return await this.saveProductsBatch(newProducts);
    }
    return;
  }

  private async saveProductsBatch(
    products: CreateProductsDto[],
  ): Promise<Products[]> {
    try {
      return await this.productsRepository.createManyFromJson(products);
    } catch (error) {
      console.error('Error saving products batch:', error);
      throw new BadRequestException('Error saving products', error);
    }
  }

  async findAll(): Promise<Products[]> {
    try {
      return await this.productsRepository.findAll();
    } catch (error) {
      throw new BadRequestException('Error fetching products', error);
    }
  }
}
