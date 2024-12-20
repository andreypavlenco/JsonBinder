import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { UpdateCategoriesDto } from './dto/update-categories-dto';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoriesService.delete(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoriesDto: UpdateCategoriesDto,
  ) {
    return this.categoriesService.update(id, updateCategoriesDto);
  }

  @Get(':id')
  findId(@Param('id') id: string) {
    return this.categoriesService.findId(id);
  }
}
