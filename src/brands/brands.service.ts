import { BadRequestException, Catch, Injectable } from '@nestjs/common';
import { BrandsRepository } from 'src/repositories/repository/brands.repository';
import { CreateBrandsDto } from './dto/create-brands-dto';
import { Brands } from '@prisma/client';

@Injectable()
export class BrandsService {
  constructor(private readonly brandsRepository: BrandsRepository) {}

  async saveBrandsFromJson(brands: CreateBrandsDto[]): Promise<Brands[]> {
    try {
      const saveBrands = await this.brandsRepository.createManyFromJson(brands);
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
