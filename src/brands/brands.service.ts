import { BadRequestException, Injectable } from '@nestjs/common';
import { BrandsRepository } from 'src/repositories/repository/brands.repository';
import { CreateBrandsDto } from './dto/create-brands-dto';
import { extractUniqueBrands } from './utils/extract-brands';
import { ReadFileService } from 'src/fs-module/fs.read/fs.read.service';
import { CreateProductsDto } from 'src/products/dto/create-products-dto';

@Injectable()
export class BrandsService {
  constructor(
    private readonly brandRepository: BrandsRepository,
    private readonly readFileService: ReadFileService,
  ) {}

  async createFromFile() {
    try {
      const products: CreateProductsDto[] =
        await this.readFileService.readFile();
      const uniqueBrands = extractUniqueBrands(products);

      return await this.createManyFromList(uniqueBrands);
    } catch (error) {
      throw new BadRequestException(
        'Error reading products or creating brands',
        error,
      );
    }
  }

  private async createManyFromList(brands: string[]) {
    try {
      const createBrandsDto: CreateBrandsDto[] = brands.map((brand) => ({
        name: brand,
      }));
      return await this.saveBrands(createBrandsDto);
    } catch (error) {
      throw new BadRequestException('Error creating many brands', error);
    }
  }

  private async saveBrands(
    brands: CreateBrandsDto[],
  ): Promise<{ count: number }> {
    try {
      return await this.brandRepository.createMany(brands);
    } catch (error) {
      console.error('Error while saving categories:', error);
      throw new BadRequestException('Failed to save categories');
    }
  }

  async findAll() {
    try {
      return await this.brandRepository.findAll();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
