import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BrandsRepository } from 'src/modules/brands/repository/brands.repository';
import { CreateBrandsDto } from './dto/create-brands-dto';
import { Brands } from '@prisma/client';
import { UpdateBrandsDto } from './dto/update-brands-dto';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';

@Injectable()
export class BrandsService {
  constructor(
    @Inject('BRANDS_REPOSITORY')
    private readonly brandsRepository: BrandsRepository,
  ) {}

  async createMany(brands: CreateBrandsDto[]): Promise<Brands[]> {
    try {
      const brand = await this.brandsRepository.createMany(brands);
      return brand;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.SAVE_BRANDS);
    }
  }

  async findAll(): Promise<Brands[]> {
    try {
      const brands = await this.brandsRepository.findAll();
      return brands;
    } catch (error) {
      throw error //new Error(ERROR_MESSAGES.RETRIEVE_BRANDS);
    }
  }

  async findId(id: string): Promise<Brands> {
    try {
      const brand = await this.brandsRepository.findById(id);
      if (!brand) {
        throw new NotFoundException(ERROR_MESSAGES.BRAND_NOT_FOUND + `${id}`);
      }
      return brand;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(ERROR_MESSAGES.RETRIEVE_BRAND);
    }
  }

  async delete(id: string): Promise<{ title: string }> {
    try {
      const brand = await this.brandsRepository.delete(id);
      if (!brand) {
        throw new NotFoundException(ERROR_MESSAGES.BRAND_NOT_FOUND + `${id}`);
      }
      return brand;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(ERROR_MESSAGES.DELETE_BRAND);
    }
  }

  async update(id: string, dto: UpdateBrandsDto): Promise<Brands> {
    try {
      const brand = await this.brandsRepository.update(id, dto);
      if (!brand) {
        throw new NotFoundException(ERROR_MESSAGES.BRAND_NOT_FOUND + `${id}`);
      }
      return brand;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(ERROR_MESSAGES.UPDATE_BRAND);
    }
  }
}
