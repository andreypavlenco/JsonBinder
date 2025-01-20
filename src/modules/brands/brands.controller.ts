import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { UpdateBrandsDto } from './dto/update-brands-dto';
import { IdParamDto } from 'src/common/dto/id-param.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  @Delete(':id')
  delete(@Param() params: IdParamDto) {
    return this.brandsService.delete(params.id);
  }

  @Patch(':id')
  // @TODO dto.title can be empty string
  update(@Param() params: IdParamDto, @Body() dto: UpdateBrandsDto) {
    return this.brandsService.update(params.id, dto);
  }

  @Get(':id')
  findId(@Param() params: IdParamDto) {
    return this.brandsService.findById(params.id);
  }
}
