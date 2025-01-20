import { Inject, Injectable } from '@nestjs/common';
import { BrandsRepository } from 'src/modules/brands/repository/brands.repository';
import { Brands } from '@prisma/client';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';
import NotFoundError from 'src/common/exceptions/not-found.exception';
import { BRAND_REPOSITORY_TOKEN } from 'src/common/constants/repository-token';
import { CreateBrandsDto, UpdateBrandsDto } from './dto';
import { handleHttpException } from 'src/common/exceptions/handle-http.exception';

@Injectable()
export class BrandsService {
  constructor(
    @Inject(BRAND_REPOSITORY_TOKEN)
    private readonly brandsRepository: BrandsRepository,
  ) {}

  async createMany(brands: CreateBrandsDto[]): Promise<Brands[]> {
    try {
      return await this.brandsRepository.createMany(brands);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.SAVE_BRANDS);
    }
  }

  async findAll(): Promise<Brands[]> {
    try {
      return await this.brandsRepository.findAll();
    } catch (error) {
      throw new Error(ERROR_MESSAGES.RETRIEVE_BRANDS);
    }
  }

  async findById(id: string): Promise<Brands> {
    try {
      const brand = await this.brandsRepository.findById(id);
      if (!brand) {
        throw new NotFoundError(ERROR_MESSAGES.BRAND_NOT_FOUND, id);
      }
      return brand;
    } catch (error) {
      handleHttpException(error, ERROR_MESSAGES.RETRIEVE_BRAND);
    }
  }

  async delete(id: string): Promise<{ title: string }> {
    try {
      const brand = await this.brandsRepository.delete(id);
      if (!brand) {
        throw new NotFoundError(ERROR_MESSAGES.BRAND_NOT_FOUND, id);
      }
      return brand;
    } catch (error) {
      handleHttpException(error, ERROR_MESSAGES.DELETE_BRAND);
    }
  }

  async update(id: string, dto: UpdateBrandsDto): Promise<Brands> {
    try {
      const brand = await this.brandsRepository.update(id, dto);
      if (!brand) {
        throw new NotFoundError(ERROR_MESSAGES.BRAND_NOT_FOUND, id);
      }
      return brand;
    } catch (error) {
      handleHttpException(error, ERROR_MESSAGES.UPDATE_BRAND);
    }
  }
}
