import { Inject, Injectable } from '@nestjs/common';
import { Categories } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategoriesDto } from 'src/modules/categories/dto/create-categories-dto';
import { UpdateCategoriesDto } from 'src/modules/categories/dto/update-categories-dto';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class CategoriesRepository extends BaseRepository<
  Categories,
  CreateCategoriesDto,
  UpdateCategoriesDto
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.categories);
  }
}
