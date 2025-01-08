import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { CategoriesRepository } from './repository/categories.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    {
      provide: 'CATEGORIES_REPOSITORY',
      useClass: CategoriesRepository,
    },
  ],
  exports: [CategoriesService],
})
export class CategoriesModule {}
