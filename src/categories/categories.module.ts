import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { RepositoryModule } from 'src/repositories/repository/repository.module';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [RepositoryModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
