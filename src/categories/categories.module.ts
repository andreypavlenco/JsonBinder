import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { ErrorHandlerModule } from 'src/shared/error-handler/error-handler.module';
import { RepositoryModule } from 'src/repositories/repository/repository.module';

@Module({
  imports: [RepositoryModule, ErrorHandlerModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
