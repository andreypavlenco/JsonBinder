import { Injectable } from '@nestjs/common';
import { Brands } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IBrandsRepository } from '../interfaces/brands-repository.interface';
import { CreateBrandsDto } from 'src/brands/dto/create-brands-dto';

@Injectable()
export class BrandsRepository implements IBrandsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(dto: CreateBrandsDto[]): Promise<{ count: number }> {
    return await this.prisma.brands.createMany({
      data: dto.map((brand) => ({
        name: brand.name,
        createdAt: new Date(),
      })),
    });
  }

  async findAll(): Promise<Brands[]> {
    return this.prisma.brands.findMany();
  }
}
