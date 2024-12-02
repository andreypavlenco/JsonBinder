import { Module } from '@nestjs/common';
import { CategoriesCreateService } from './categories.service';
import { CategoriesCreateController } from './categories.controller';
import { FileReadModule } from 'src/fs/fs.read/fs.read.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule, FileReadModule],
  controllers: [CategoriesCreateController],
  providers: [CategoriesCreateService],
  exports: [CategoriesCreateService],
})
export class CategoriesCreateModule {}
