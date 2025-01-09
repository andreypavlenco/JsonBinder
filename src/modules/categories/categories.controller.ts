import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { UpdateCategoriesDto } from './dto/update-categories-dto';
import { IdParamDto } from 'src/common/dto/id-param.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Delete(':id')
  delete(@Param() params: IdParamDto) {
    return this.categoriesService.delete(params.id);
  }

  @Patch(':id')
  update(@Param() params: IdParamDto, @Body() dto: UpdateCategoriesDto) {
    return this.categoriesService.update(params.id, dto);
  }

  @Get(':id')
  findId(@Param() params: IdParamDto) {
    return this.categoriesService.findId(params.id);
  }
}
