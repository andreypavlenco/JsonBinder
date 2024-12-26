import { Injectable } from '@nestjs/common';
import { BrandsRepository } from 'src/repositories/repository/brands.repository';
import { CreateBrandsDto } from './dto/create-brands-dto';
import { Brands } from '@prisma/client';
import { UpdateBrandsDto } from './dto/update-brands-dto';
import { ErrorHandlerService } from 'src/shared/error-handler/error-handler.service';
import { ERROR_MESSAGES } from 'src/shared/ constants/error-messages';

@Injectable()
export class BrandsService {
  constructor(
    private readonly brandsRepository: BrandsRepository,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  async saveBrandsFromJson(brands: CreateBrandsDto[]): Promise<Brands[]> {
    try {
      return await this.brandsRepository.createManyFromJson(brands);
    } catch (error) {
      this.errorHandler.handleInternalServerError(
        error,
        ERROR_MESSAGES.SAVE_BRANDS,
      );
    }
  }

  async findAll(): Promise<Brands[]> {
    try {
      return await this.brandsRepository.findAll();
    } catch (error) {
      this.errorHandler.handleInternalServerError(
        error,
        ERROR_MESSAGES.RETRIEVE_BRANDS,
      );
    }
  }

  async findId(id: string): Promise<Brands> {
    try {
      const brand = await this.brandsRepository.findById(id);
      if (!brand) {
        this.errorHandler.handleNotFound('Brand', `with ID ${id}`);
      }
      return brand;
    } catch (error) {
      this.errorHandler.handleInternalServerError(
        error,
        ERROR_MESSAGES.RETRIEVE_BRAND,
      );
    }
  }

  async delete(id: string): Promise<{ title: string }> {
    try {
      const result = await this.brandsRepository.delete(id);
      if (!result) {
        this.errorHandler.handleNotFound('Brand', `with ID ${id}`);
      }
      return result;
    } catch (error) {
      this.errorHandler.handleBadRequest(error, ERROR_MESSAGES.DELETE_BRAND);
    }
  }

  async update(id: string, dto: UpdateBrandsDto): Promise<Brands> {
    try {
      const updatedBrand = await this.brandsRepository.update(id, dto);
      if (!updatedBrand) {
        this.errorHandler.handleNotFound('Brand', `with ID ${id}`);
      }
      return updatedBrand;
    } catch (error) {
      this.errorHandler.handleBadRequest(error, ERROR_MESSAGES.UPDATE_BRAND);
    }
  }
}
