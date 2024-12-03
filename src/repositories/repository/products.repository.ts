import { Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IProductsRepository } from '../interfaces/products-repository.interface';
import { CreateProductsDto } from 'src/products/dto/create-products-dto';

@Injectable()
export class ProductRepository implements IProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(dto: CreateProductsDto[]): Promise<{ count: number }> {
    return await this.prisma.products.createMany({
      data: dto.map((product) => ({
        title: product.title,
        description: product.description,
        brand: product.brand,
        price: product.price,
        img: product.img,
        rating: product.rating,
        category_id: product.categoryId,
        brant_id: product.brandId,
        createdAt: new Date(product.createdAt),
        updatedAt: new Date(product.updatedAt),
        brandEntity: {
          connect: {
            id: product.brandId,
          },
        },
        categories: {
          connect: {
            id: product.categoryId,
          },
        },
      })),
    });
  }

  async findAll(): Promise<Products[]> {
    return this.prisma.products.findMany();
  }
}
