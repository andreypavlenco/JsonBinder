import {  IsString } from 'class-validator';

export class CreateBrandsDto {
  @IsString()
  title: string;
}
