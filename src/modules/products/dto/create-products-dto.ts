import { MiddlewareBuilder } from '@nestjs/core';
import {
  ArrayNotEmpty,
  IsArray,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  isURL,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';

// @TODO check:
// length (empty sting is useless) (DB throw the error if big size)
// numbers after point for decimal
// @IsUrl if img must be url
// uuid if foreign key

export class CreateProductsDto {
  @IsUUID()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  @Length(40)
  title: string;

  @IsDecimal()
  @Min(1)
  price: number;

  @IsArray()
  @IsUrl({}, { each: true })
  @IsNotEmpty({ each: true })
  img: string[];

  @IsString()
  brand: string;

  @IsUUID()
  brandId: string;

  @IsArray()
  @IsUrl()
  description: string[];

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  characteristics: string[];
}
