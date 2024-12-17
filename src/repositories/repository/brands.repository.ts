import { Injectable } from '@nestjs/common';
import { Brands } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IBrandsRepository } from '../interfaces/brands-repository.interface';
import { CreateBrandsDto } from 'src/brands/dto/create-brands-dto';
import { UpdateBrandsDto } from 'src/brands/dto/update-brands-dto';

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

  async findOne(idBrands: string): Promise<Brands> {
    return await this.prisma.brands.findUnique({
      where: {
        id: idBrands,
      },
    });
  }

  async delete(idBrands: string): Promise<{ name: string }> {
    return await this.prisma.brands.delete({
      where: {
        id: idBrands,
      },
      select: {
        name: true,
      },
    });
  }

  async update(idBrands: string, dto: UpdateBrandsDto): Promise<Brands> {
    return await this.prisma.brands.update({
      where: {
        id: idBrands,
      },
      data: {
        ...dto,
      },
    });
  }
}
