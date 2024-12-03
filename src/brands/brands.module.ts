import { PrismaModule } from 'prisma/prisma.module';
import { BrandsCreateController } from './brands.controller';
import { BrandsCreateService } from './brands.service';
import { Module } from '@nestjs/common';
import { FileReadModule } from 'src/fs/fs.read/fs.read.module';

@Module({
  imports: [PrismaModule, FileReadModule],
  controllers: [BrandsCreateController],
  providers: [BrandsCreateService],
  exports: [BrandsCreateService],
})
export class BrandsCreateModule {}
