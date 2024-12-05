import { Injectable } from '@nestjs/common';
import { Brands } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IBrandsRepository } from '../interfaces/brands-repository.interface';
import { CreateBrandsDto } from 'src/brands/dto/create-brands-dto';

@Injectable()
export class BrandsRepository implements IBrandsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createManyFromJson(dto: CreateBrandsDto[]): Promise<Brands[]> {
    return await this.prisma.brands.createManyAndReturn({
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
