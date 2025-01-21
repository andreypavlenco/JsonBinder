import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { BrandsRepository } from './repository/brands.repository';
import { BRAND_REPOSITORY_TOKEN } from 'src/common/constants/repository-token';

@Module({
  imports: [PrismaModule],
  controllers: [BrandsController],
  providers: [
    BrandsService,
    {
      provide: BRAND_REPOSITORY_TOKEN,
      useClass: BrandsRepository,
    },
  ],
  exports: [BrandsService],
})
export class BrandsModule {}
