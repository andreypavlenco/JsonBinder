import { Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IProductsRepository } from '../interfaces/products-repository.interface';
import { CreateProductsDto } from 'src/products/dto/create-products-dto';

@Injectable()
export class ProductRepository implements IProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(dto: CreateProductsDto[]): Promise<Products[]> {
    return await this.prisma.products.createMany({
      data: dto.map((product) => ({
        brand_id: product.brandId,
        category_id: product.categoryId,
        title: product.title,
        price: product.price,
        img: product.img,
        description: product.description,
        rating: product.rating,
        createdAt: new Date(product.createdAt),
        updatedAt: new Date(product.updatedAt),
        //brand: product.brand,
      })),
    });
  }
}
