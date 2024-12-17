import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { BrandsRepository } from 'src/repositories/repository/brands.repository';
import { CreateBrandsDto } from './dto/create-brands-dto';
import { Brands } from '@prisma/client';
import { UpdateBrandsDto } from './dto/update-brands-dto';
import { NotFoundException } from 'src/errors/not-found-exception';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';

@Injectable()
export class BrandsService {
  constructor(private readonly brandsRepository: BrandsRepository,
     private readonly errorHandler: ErrorHandlerService,
  ) {}

  async saveBrandsFromJson(brands: CreateBrandsDto[]): Promise<Brands[]> {
    try {
      return await this.brandsRepository.createManyFromJson(brands);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to save brands. Please try again later.',
      );
    }
  }

  async findAll(): Promise<Brands[]> {
    try {
      return await this.brandsRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve brands. Please try again later.',
      );
    }
  }

  async findId(id: string): Promise<Brands> {
    try {
      return await this.brandsRepository.findOne(id);
    } catch (error) {
      throw new NotFoundException('Error fetching products');
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
