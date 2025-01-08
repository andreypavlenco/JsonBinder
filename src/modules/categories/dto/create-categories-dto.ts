import { IsString } from 'class-validator';

export class CreateCategoriesDto {
  @IsString()
  title: string;
}
