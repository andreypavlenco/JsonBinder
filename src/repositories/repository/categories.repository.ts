import { Injectable } from '@nestjs/common';
import { Categories } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategoriesDto } from 'src/categories/dto/create-categories-dto';
import { UpdateCategoriesDto } from 'src/categories/dto/update-categories-dto';
import { IRepository } from '../interfaces/repository.interface';

@Injectable()
export class CategoriesRepository
  implements IRepository<Categories, CreateCategoriesDto>
{
  constructor(private readonly prisma: PrismaService) {}

  async createManyFromJson(dto: CreateCategoriesDto[]): Promise<Categories[]> {
    return await this.prisma.categories.createManyAndReturn({
      data: dto.map((category) => ({
        title: category.title,
        createdAt: new Date(),
      })),
    });
  }

  async findAll(): Promise<Categories[]> {
    return this.prisma.categories.findMany();
  }

  async findById(id: string): Promise<Categories> {
    return await this.prisma.categories.findUnique({
      where: {
        id,
      },
    });
  }

  async delete(id: string): Promise<{ title: string }> {
    return await this.prisma.categories.delete({
      where: { id },
      select: { title: true },
    });
  }

  async update(id: string, dto: UpdateCategoriesDto): Promise<Categories> {
    return await this.prisma.categories.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }
}
