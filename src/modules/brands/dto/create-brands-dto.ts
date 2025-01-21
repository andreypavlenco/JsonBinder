import { IsString, Length, ValidateIf } from 'class-validator';

export class CreateBrandsDto {
  @ValidateIf((t) => t.title !== '')
  @IsString()
  @Length(3, 30)
  title: string;
}
