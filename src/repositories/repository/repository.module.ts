import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { BrandsRepository } from './brands.repository';
import { ProductRepository } from './products.repository';
import { CategoriesRepository } from './categories.repository';
import Redis from 'ioredis';
import { RedisRepository } from './redis.repository';

@Module({
  imports: [PrismaModule, Redis],
  providers: [
    BrandsRepository,
    ProductRepository,
    CategoriesRepository,
    RedisRepository,
  ],
  exports: [
    BrandsRepository,
    ProductRepository,
    CategoriesRepository,
    RedisRepository,
  ],
})
export class RepositoryModule {}
