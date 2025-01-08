import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateProductsDto {
  @IsString()
  categoryId: string;

  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsArray()
  @IsString({ each: true })
  img: string[];

  @IsString()
  brand: string;

  @IsString()
  brandId: string;

  @IsArray()
  @IsString({ each: true })
  description: string[];

  @IsNumber()
  rating: number;

  @IsArray()
  @IsString({ each: true })
  characteristics: string[];
}
