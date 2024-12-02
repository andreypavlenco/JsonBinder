import { Module } from '@nestjs/common';
import { ProductsCreateController } from './products.controller';
import { ProductsCreateService } from './products.service';
import { PrismaModule } from 'prisma/prisma.module';
import { FileReadModule } from 'src/fs/fs.read/fs.read.module';

@Module({
  imports: [PrismaModule, FileReadModule],
  controllers: [ProductsCreateController],
  providers: [ProductsCreateService],
})
export class ProductsCreateModule {}
