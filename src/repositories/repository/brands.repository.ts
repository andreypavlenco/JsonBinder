import { Injectable } from '@nestjs/common';
import { Brands, Categories, Products } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IBrandsRepository } from '../interfaces/brands-repository.interface';

@Injectable()
export class BrandsRepository implements IBrandsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(dto: Brands[]): Promise<{ count: number }> {
    return await this.prisma.brands.createMany({
      data: dto.map((brand) => ({
        name: brand.name,
        createdAt: new Date(brand.createdAt),
      })),
    });
  }

  async findAll(): Promise<Brands[]> {
    return this.prisma.brands.findMany();
  }
}
