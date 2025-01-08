import { Inject, Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductsDto } from 'src/modules/products/dto/create-products-dto';
import { UpdateProductsDto } from 'src/modules/products/dto/update-products-dto';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class ProductRepository extends BaseRepository<
  Products,
  CreateProductsDto,
  UpdateProductsDto
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.products);
  }
}
