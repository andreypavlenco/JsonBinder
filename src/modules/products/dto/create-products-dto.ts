import {
  ArrayNotEmpty,
  IsArray,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';

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
