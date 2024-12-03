import { BadRequestException, Injectable } from '@nestjs/common';
import { BrandsRepository } from 'src/repositories/repository/brands.repository';
import { CreateBrandsDto } from './dto/create-brands-dto';
import { extractUniqueBrands } from './utils/extract-brands';

@Injectable()
export class BrandsCreateService {
  constructor(
    private readonly brandRepository: BrandsRepository,
    private readonly readFileService: FileReadService, // сервис для чтения данных из файлов
  ) {}

  async createFromFile(filePath: string) {
    try {
      const products = await this.readFileService.readData(filePath);

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
      return await this.saveCategories(createBrandsDto);
    } catch (error) {
      throw new BadRequestException('Error creating many brands', error);
    }
  }


  private async saveCategories(
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

