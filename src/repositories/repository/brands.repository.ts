import { Injectable } from '@nestjs/common';
import { Brands, Categories, Products } from '@prisma/client';
import { CreateProductDto } from './dto';
import { PrismaService } from 'prisma/prisma.service';
import { ICategoriesRepository } from '../interfaces/categories-repository.interface';
import { IBrandsRepository } from '../interfaces/brands-repository.interface';

@Injectable()
export class BrandsRepository implements IBrandsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDto): Promise<Brands> {
    return this.prisma.categories.create({
      data: {
        ...data,
        brand: { connect: { id: data.brandId } },
      },
    });
  }

  async findAll(): Promise<Brands[]> {
    return this.prisma.brands.findMany();
  }
}
