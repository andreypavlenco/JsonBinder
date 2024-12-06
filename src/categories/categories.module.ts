import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { RepositoryModule } from 'src/repositories/repository/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
