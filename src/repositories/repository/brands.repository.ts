import { Injectable } from '@nestjs/common';
import { Brands } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateBrandsDto } from 'src/brands/dto/create-brands-dto';
import { UpdateBrandsDto } from 'src/brands/dto/update-brands-dto';
import { IRepository } from '../interfaces/repository.interface';

@Injectable()
export class BrandsRepository implements IRepository<Brands, CreateBrandsDto> {
  constructor(private readonly prisma: PrismaService) {}

  async createManyFromJson(dto: CreateBrandsDto[]): Promise<Brands[]> {
    return await this.prisma.brands.createManyAndReturn({
      data: dto.map((brand) => ({
        title: brand.title,
        createdAt: new Date(),
      })),
    });
  }

  async findAll(): Promise<Brands[]> {
    return this.prisma.brands.findMany();
  }

  async findById(id: string): Promise<Brands> {
    return await this.prisma.brands.findUnique({
      where: {
        id,
      },
    });
  }

  async delete(id: string): Promise<{ title: string }> {
    return await this.prisma.brands.delete({
      where: {
        id,
      },
    });
  }

  async update(id: string, dto: UpdateBrandsDto): Promise<Brands> {
    return await this.prisma.brands.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }
}
