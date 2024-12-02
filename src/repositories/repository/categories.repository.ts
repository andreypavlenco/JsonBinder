import { Injectable } from '@nestjs/common';
import { Categories, Products } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { ICategoriesRepository } from '../interfaces/categories-repository.interface';

@Injectable()
export class CategoriesRepository implements ICategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(dto: Categories[]): Promise<{ count: number }> {
    return await this.prisma.categories.createMany({
      data: dto.map((category) => ({
        name: category.name,
        createdAt: new Date(category.createdAt),
      })),
    });
  }

  async findAll(): Promise<Categories[]> {
    return this.prisma.brands.findMany();
  }
}
