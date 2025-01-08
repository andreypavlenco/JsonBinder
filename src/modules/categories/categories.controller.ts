import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { UpdateCategoriesDto } from './dto/update-categories-dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoriesService.delete(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoriesDto) {
    return this.categoriesService.update(id, dto);
  }

  @Get(':id')
  findId(@Param('id') id: string) {
    return this.categoriesService.findId(id);
  }
}
