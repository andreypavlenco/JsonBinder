import { Injectable } from '@nestjs/common';
import { Categories, Products } from '@prisma/client';
import { CreateProductDto } from './dto';
import { PrismaService } from 'prisma/prisma.service';
import { ICategoriesRepository } from '../interfaces/categories-repository.interface';

@Injectable()
export class CategoriesRepository implements ICategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDto): Promise<Categories> {
    return this.prisma.categories.create({
      data: {
        ...data,
        brand: { connect: { id: data.brandId } },
      },
    });
  }

  async findAll(): Promise<Categories[]> {
    return this.prisma.brands.findMany();
  }
}
