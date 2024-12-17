import { Brands } from '@prisma/client';
import { CreateBrandsDto } from 'src/brands/dto/create-brands-dto';

export interface IBrandsRepository {
  createManyFromJson(dto: CreateBrandsDto[]): Promise<Brands[]>;
  findAll(): Promise<Brands[]>;
}
