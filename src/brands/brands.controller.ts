import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { UpdateBrandsDto } from './dto/update-brands-dto';

@Controller()
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.brandsService.delete(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductsDto: UpdateBrandsDto) {
    return this.brandsService.update(id, updateProductsDto);
  }

  @Get(':id')
  findId(@Param('id') id: string) {
    return this.brandsService.findId(id);
  }
}
