import { Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';
import { CreateProductDto } from './dto';
import { PrismaService } from 'prisma/prisma.service';
import { IProductRepository } from '../interfaces/products-repository.interface';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDto): Promise<Products> {
    return this.prisma.products.create({
      data: {
        ...data,
        brand: { connect: { id: data.brandId } },
      },
    });
  }
}
