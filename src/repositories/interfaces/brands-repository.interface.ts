import { Brands } from '@prisma/client';
import { CreateBrandsDto } from 'src/brands/dto/create-brands-dto';

export interface IBrandsRepository {
  createMany(dto: CreateBrandsDto[]): Promise<{ count: number }>;
  findAll(): Promise<Brands[]>;
}
