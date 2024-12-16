import { Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IProductsRepository } from '../interfaces/products-repository.interface';
import { CreateProductsDto } from 'src/products/dto/create-products-dto';

@Injectable()
export class ProductRepository implements IProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createManyFromJson(dto: CreateProductsDto[]): Promise<Products[]> {
    return await this.prisma.products.createManyAndReturn({
      data: dto.map((product) => ({
        title: product.title,
        characteristics: product.characteristics,
        description: product.description,
        brand: product.brand,
        price: product.price,
        img: product.img,
        rating: product.rating,
        categoryId: product.categoryId,
        brandId: product.brandId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    });
  }

  async findAll(): Promise<Products[]> {
    return await this.prisma.products.findMany();
  }

  async findOne(idProducts: string): Promise<Products> {
    return await this.prisma.products.findUnique({
      where: {
        id: idProducts,
      },
    });
  }

  async delete(idProducts: string): Promise<Products> {
    return await this.prisma.products.delete({
      where: {
        id: idProducts,
      },
    });
  }

  async update(idProducts: string, dto: CreateProductsDto): Promise<Products> {
    return await this.prisma.products.update({
      where: {
        id: idProducts,
      },
      data: {
        ...dto,
      },
    });
  }
}
