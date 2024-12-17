import { Brands } from '@prisma/client';
import { CreateBrandsDto } from 'src/brands/dto/create-brands-dto';
import { UpdateBrandsDto } from 'src/brands/dto/update-brands-dto';

export interface IBrandsRepository {
  createManyFromJson(dto: CreateBrandsDto[]): Promise<Brands[]>;
  findAll(): Promise<Brands[]>;
  findOne(id: string): Promise<Brands>;
  delete(id: string): Promise<{ name: string }>;
  update(id: string, dto: UpdateBrandsDto): Promise<Brands>;
}
