import { BadRequestException, Injectable } from '@nestjs/common';
import { BrandsRepository } from 'src/repositories/repository/brands.repository';
import { CreateBrandsDto } from './dto/create-brands-dto';
import { Brands } from '@prisma/client';
import { UpdateBrandsDto } from './dto/update-brands-dto';

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

  async findAll(): Promise<Brands[]> {
    try {
      return await this.brandsRepository.findAll();
    } catch (error) {
      throw new BadRequestException('  Error fetching brands', error);
    }
  }

  async findId(id: string): Promise<Brands> {
    try {
      return await this.brandsRepository.findOne(id);
    } catch (error) {
      throw new BadRequestException('Error fetching products', error);
    }
  }

  async delete(id: string): Promise<{ name: string }> {
    try {
      return await this.brandsRepository.delete(id);
    } catch (error) {
      throw new BadRequestException('Error fetching products', error);
    }
  }

  async update(id: string, dto: UpdateBrandsDto): Promise<Brands> {
    try {
      return await this.brandsRepository.update(id, dto);
    } catch (error) {
      throw new BadRequestException('Error fetching products', error);
    }
  }
}
