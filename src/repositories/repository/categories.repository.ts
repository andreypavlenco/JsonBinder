import { Injectable } from '@nestjs/common';
import { Categories } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { ICategoriesRepository } from '../interfaces/categories-repository.interface';
import { CreateCategoriesDto } from 'src/categories/dto/create-categories-dto';

@Injectable()
export class CategoriesRepository implements ICategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createManyFromJson(dto: CreateCategoriesDto[]): Promise<Categories[]> {
    return await this.prisma.categories.createManyAndReturn({
      data: dto.map((category) => ({
        name: category.name,
        createdAt: new Date(),
      })),
    });
  }

  async findAll(): Promise<Categories[]> {
    return this.prisma.categories.findMany();
  }
}
