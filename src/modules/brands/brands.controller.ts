import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { UpdateBrandsDto } from './dto/update-brands-dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.brandsService.delete(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBrandsDto) {
    return this.brandsService.update(id, dto);
  }

  @Get(':id')
  findId(@Param('id') id: string) {
    return this.brandsService.findId(id);
  }
}
