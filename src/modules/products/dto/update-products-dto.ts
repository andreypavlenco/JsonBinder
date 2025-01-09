import { IsArray, IsNumber, IsString } from 'class-validator';

export class UpdateProductsDto {
  @IsString()
  title?: string;

  @IsNumber()
  price?: number;

  @IsArray()
  @IsString({ each: true })
  description?: string[];

  @IsNumber()
  rating?: number;

  @IsArray()
  @IsString({ each: true })
  characteristics?: string[];
}
