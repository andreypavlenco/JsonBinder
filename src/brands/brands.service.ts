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
      const uniqueBrands: CreateBrandsDto[] = brands.map((brand) => ({
        name: brand,
      }));
      return await this.checkAndAddUniqueBrands(uniqueBrands);
    } catch (error) {
      throw new BadRequestException('Error creating many brands', error);
    }
  }

  private async checkAndAddUniqueBrands(brands: CreateBrandsDto[]) {
    try {
      const existingBrands = await this.findAll();

      const uniqueBrands = brands.filter((brand) => {
        return !existingBrands.some(
          (existingBrand) => existingBrand.name === brand.name,
        );
      });

      if (uniqueBrands.length > 0) {
        await this.saveBrands(uniqueBrands);
      } else {
        return true;
      }
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
