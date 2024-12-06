import { BadRequestException, Catch, Injectable } from '@nestjs/common';
import { BrandsRepository } from 'src/repositories/repository/brands.repository';
import { CreateBrandsDto } from './dto/create-brands-dto';
import { extractUniqueBrands } from './utils/extract-brands';
import { ReadFileService } from 'src/json-file-service/json-read/json.read.service';
import { Brands } from '@prisma/client';
import { WriteFileService } from 'src/json-file-service/json-write/json.write.service';

@Injectable()
export class BrandsService {
  constructor(
    private readonly brandsRepository: BrandsRepository,
    private readonly readFileService: ReadFileService,
    private readonly writingFileService: WriteFileService,
  ) {}

  async createBrandsFromFile(): Promise<Brands[]> {
    try {
      const products = await this.readFileService.readFile();
      const brandNames = extractUniqueBrands(products);
      return await this.createUniqueBrands(brandNames);
    } catch (error) {
      throw new BadRequestException('Error processing brands from file', error);
    }
  }

  private async createUniqueBrands(brandNames: string[]): Promise<Brands[]> {
    const createBrandsDto = brandNames.map((name) => ({ name }));
    const existingBrands = await this.findAllBrands();

    const newBrands = this.filterUniqueBrands(existingBrands, createBrandsDto);

    if (newBrands.length > 0) {
      return await this.saveBrands(newBrands);
    }
    return;
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

  private async saveBrandsToJsonFile(brands: Brands[]) {
    try {
      return await this.writingFileService.saveBrandsToFile(brands);
    } catch (error) {
      throw new BadRequestException('Error saving brands', error);
    }
  }

  private async saveBrands(brands: CreateBrandsDto[]): Promise<Brands[]> {
    try {
      const saveBrands = await this.brandsRepository.createManyFromJson(brands);
      await this.saveBrandsToJsonFile(saveBrands);
      return saveBrands;
    } catch (error) {
      throw new BadRequestException('Error saving brands', error);
    }
  }

  async findAllBrands(): Promise<Brands[]> {
    try {
      return await this.brandsRepository.findAll();
    } catch (error) {
      throw new BadRequestException('Error fetching brands', error);
    }
  }
}
