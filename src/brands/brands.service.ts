import { BadRequestException, Injectable } from '@nestjs/common';
import { BrandsRepository } from 'src/repositories/repository/brands.repository';
import { CreateBrandsDto } from './dto/create-brands-dto';
import { extractUniqueBrands } from './utils/extract-brands';
import { ReadFileService } from 'src/fs-module/fs.read/fs.read.service';

@Injectable()
export class BrandsService {
  constructor(
    private readonly brandsRepository: BrandsRepository,
    private readonly fileProcessingService: ReadFileService,
  ) {}

  async createBrandsFromFile(): Promise<{ count: number } | true> {
    try {
      const products = await this.fileProcessingService.readFile();
      const brandNames = extractUniqueBrands(products);
      return await this.createUniqueBrands(brandNames);
    } catch (error) {
      throw new BadRequestException('Error processing brands from file', error);
    }
  }

  private async createUniqueBrands(
    brandNames: string[],
  ): Promise<{ count: number } | true> {
    const createBrandsDto = brandNames.map((name) => ({ name }));
    const existingBrands = await this.findAllBrands();

    const newBrands = this.filterUniqueBrands(existingBrands, createBrandsDto);

    if (newBrands.length > 0) {
      return await this.saveBrands(newBrands);
    }
    return true;
  }

  private filterUniqueBrands(
    existingBrands: CreateBrandsDto[],
    newBrands: CreateBrandsDto[],
  ): CreateBrandsDto[] {
    return newBrands.filter(
      (newBrand) =>
        !existingBrands.some(
          (existingBrand) => existingBrand.name === newBrand.name,
        ),
    );
  }

  private async saveBrands(
    brands: CreateBrandsDto[],
  ): Promise<{ count: number }> {
    try {
      return await this.brandsRepository.createMany(brands);
    } catch (error) {
      throw new BadRequestException('Error saving brands', error);
    }
  }

  async findAllBrands(): Promise<CreateBrandsDto[]> {
    try {
      return await this.brandsRepository.findAll();
    } catch (error) {
      throw new BadRequestException('Error fetching brands', error);
    }
  }
}
