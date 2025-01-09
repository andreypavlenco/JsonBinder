import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductsDto } from './dto/update-products-dto';
import { IdParamDto } from 'src/common/dto/id-param.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Delete(':id')
  delete(@Param() params: IdParamDto) {
    return this.productsService.delete(params.id);
  }

  @Patch(':id')
  update(@Param() params: IdParamDto, @Body() dto: UpdateProductsDto) {
    return this.productsService.update(params.id, dto);
  }

  @Get(':id')
  findById(@Param() params: IdParamDto) {
    return this.productsService.findById(params.id);
  }
}
