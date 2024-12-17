import { Injectable } from '@nestjs/common';
import { BrandsRepository } from 'src/repositories/repository/brands.repository';
import { CreateBrandsDto } from './dto/create-brands-dto';
import { Brands } from '@prisma/client';
import { UpdateBrandsDto } from './dto/update-brands-dto';
import { NotFoundException } from 'src/common/errors/not-found-exception';
import { ErrorHandlerService } from 'src/common/error-handler/error-handler.service';

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
        'Failed to save brands. Please try again later.',
      );
    }
  }

  async findAll(): Promise<Brands[]> {
    try {
      return await this.brandsRepository.findAll();
    } catch (error) {
      this.errorHandler.handleInternalServerError(
        error,
        'Failed to retrieve brands. Please try again later.',
      );
    }
  }

  async findId(id: string): Promise<Brands> {
    try {
      const brand = await this.brandsRepository.findOne(id);
      if (!brand) {
        this.errorHandler.handleNotFound('Brand', `with ID ${id}`);
      }
      return brand;
    } catch (error) {
      this.errorHandler.handleInternalServerError(
        error,
        'Failed to retrieve the brand. Please try again later.',
      );
    }
  }

  async delete(id: string): Promise<{ name: string }> {
    try {
      const result = await this.brandsRepository.delete(id);
      if (!result) {
        this.errorHandler.handleNotFound('Brand', `with ID ${id}`);
      }
      return result;
    } catch (error) {
      this.errorHandler.handleBadRequest(error, 'Failed to delete the brand.');
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
      this.errorHandler.handleBadRequest(error, 'Failed to update the brand.');
    }
  }
}
