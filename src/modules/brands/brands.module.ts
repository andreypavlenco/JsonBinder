import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { BrandsRepository } from './repository/brands.repository';

@Module({
  imports: [PrismaModule],
  controllers: [BrandsController],
  providers: [
    BrandsService,
    {
      provide: 'BRANDS_REPOSITORY',
      useClass: BrandsRepository,
    },
  ],
  exports: [BrandsService],
})
export class BrandsModule {}
