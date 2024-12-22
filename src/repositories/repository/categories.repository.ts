import { Injectable } from '@nestjs/common';
import { Categories } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { ICategoriesRepository } from '../interfaces/categories-repository.interface';
import { CreateCategoriesDto } from 'src/categories/dto/create-categories-dto';
import { UpdateCategoriesDto } from 'src/categories/dto/update-categories-dto';

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

  async findOne(idCategories: string): Promise<Categories> {
    return await this.prisma.categories.findUnique({
      where: {
        id: idCategories,
      },
    });
  }

  async delete(idCategories: string): Promise<{ name: string }> {
    return await this.prisma.categories.delete({
      where: {
        id: idCategories,
      },
      select: {
        name: true,
      },
    });
  }

  async update(
    idCategories: string,
    dto: UpdateCategoriesDto,
  ): Promise<Categories> {
    return await this.prisma.categories.update({
      where: {
        id: idCategories,
      },
      data: {
        ...dto,
      },
    });
  }
}
