import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { RepositoryModule } from 'src/repositories/repository/repository.module';
import { CategoriesController } from './categories.controller';
import { ErrorHandlerModule } from 'src/common/error-handler/error-handler.module';

@Module({
  imports: [RepositoryModule, ErrorHandlerModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
