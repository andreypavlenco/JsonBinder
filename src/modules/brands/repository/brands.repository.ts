import { Injectable } from '@nestjs/common';
import { Brands } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateBrandsDto } from 'src/modules/brands/dto/create-brands-dto';
import { UpdateBrandsDto } from 'src/modules/brands/dto/update-brands-dto';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class BrandsRepository extends BaseRepository<
  Brands,
  CreateBrandsDto,
  UpdateBrandsDto
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.brands);
  }
}
