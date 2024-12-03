import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { BrandsRepository } from './brands.repository';
import { ProductRepository } from './products.repository';
import { CategoriesRepository } from './categories.repository';

@Module({
    imports: [PrismaModule],
    providers: [BrandsRepository, ProductRepository , CategoriesRepository],
    exports: [BrandsRepository, ProductRepository , CategoriesRepository]
})
export class RepositoryModule {}
